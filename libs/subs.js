const { SEGMENT_DURATION } = require("../config");
const secondsToTimeString = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toFixed(3).padStart(6, "0")}`;
};

module.exports.mergeSubtitles = (subtitlesArray) => {
  let mergedSubtitles = "";
  let currentTimeOffset = 0;

  subtitlesArray.forEach((text, index) => {
    const startTime = secondsToTimeString(currentTimeOffset);
    const endTime = secondsToTimeString(currentTimeOffset + SEGMENT_DURATION);

    mergedSubtitles += `${index + 1}\n`;
    mergedSubtitles += `${startTime.replace(".", ",")} --> ${endTime.replace(
      ".",
      ",",
    )}\n`;
    mergedSubtitles += `${text}\n\n`;

    currentTimeOffset += SEGMENT_DURATION;
  });

  return mergedSubtitles;
};
