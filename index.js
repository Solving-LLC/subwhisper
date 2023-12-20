const path = require("path");
const fs = require("fs");
const ProgressBar = require("progress");
const { extractAudioFromVideo } = require("./libs/extract");
const { splitAudio } = require("./libs/split");
const { transcribeAudio } = require("./libs/transcribe");
const { mergeSubtitles } = require("./libs/subs");

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Please set OPENAI_API_KEY environment variable.");
  process.exit(1);
}

const getVideoFiles = (dir) => {
  return fs.readdirSync(dir).filter((file) => /\.(mp4|avi|mov)$/i.test(file));
};

module.exports = async function processVideoFiles(dir = ".") {
  const videoFiles = getVideoFiles(dir);
  for (const file of videoFiles) {
    console.log(`Processing ${file}...`);
    try {
      const audioPath = await extractAudioFromVideo(
        path.join(dir + "/" + file),
      );
      const audioSegments = await splitAudio(audioPath);
      fs.unlinkSync(audioPath); // remove audio file

      const bar = new ProgressBar(":bar :current/:total", {
        total: audioSegments.length,
      });
      const subtitlesArray = [];
      for (const segment of audioSegments) {
        const segmentPath = path.join(dir, segment);
        const result = await transcribeAudio(path.join(segmentPath));
        subtitlesArray.push(result);
        fs.unlinkSync(segmentPath); // remove audio segment
        bar.tick();
      }
      const mergedSubtitles = mergeSubtitles(subtitlesArray);
      fs.writeFileSync(
        path.basename(file, path.extname(file)) + ".srt",
        mergedSubtitles,
      );
    } catch (error) {
      console.error(`Error processing ${file}: ${error}`);
    }
  }
  console.log("All files processed.");
};
