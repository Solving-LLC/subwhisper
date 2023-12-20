const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const { SEGMENT_DURATION } = require("../config");

module.exports.splitAudio = (audioPath) => {
  return new Promise((resolve, reject) => {
    const baseName = path.basename(audioPath, ".mp3");
    const outputPath = `${path.dirname(audioPath)}/${baseName}_%03d.mp3`;

    ffmpeg(audioPath)
      .output(outputPath)
      .outputOptions([
        `-f segment`,
        `-segment_time ${SEGMENT_DURATION}`,
        `-c copy`,
        `-map 0:a`,
      ])
      .on("end", () => {
        const segments = fs
          .readdirSync(".")
          .filter(
            (file) =>
              file.startsWith(baseName) &&
              file.endsWith(".mp3") &&
              file !== path.basename(audioPath),
          )
          .sort();
        resolve(segments);
      })
      .on("error", (err) => reject(err))
      .run();
  });
};
