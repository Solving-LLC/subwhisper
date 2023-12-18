module.exports.SEGMENT_DURATION =
  (process.env.DURATION && parseInt(process.env.DURATION)) || 3;
module.exports.API_KEY = process.env.OPENAI_API_KEY;
