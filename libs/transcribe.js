const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
const { API_KEY } = require("../config");
const API_ENDPOINT = "https://api.openai.com/v1/audio/transcriptions";

module.exports.transcribeAudio = async (audioPath) => {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(audioPath));
  formData.append("model", "whisper-1");

  const response = await axios.post(API_ENDPOINT, formData, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      ...formData.getHeaders(),
    },
    maxBodyLength: 25 * 1024 * 1024,
  });
  return response.data?.text || "";
};
