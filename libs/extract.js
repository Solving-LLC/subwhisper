const ffmpeg = require("./ffmpeg");
module.exports.extractAudioFromVideo = (videoPath) => {
  const audioPath = videoPath.replace(/\.[^/.]+$/, "") + ".mp3";
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .noVideo()
      .audioCodec("libmp3lame")
      .save(audioPath)
      .on("end", () => resolve(audioPath))
      .on("error", (err) => reject(err));
  });
};
