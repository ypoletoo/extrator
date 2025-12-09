import axios from "axios";

const API_URL = "http://localhost:3000/extractions";

export const createExtraction = async (owner, repoName) => {
  const response = await axios.post(API_URL, {
    owner,
    repoName,
  });
  return response.data.data;
};

export const startExtraction = async (extractionId, token) => {
  const response = await axios.post(`${API_URL}/${extractionId}/start`, {
    token,
  });
  return response.data;
};

export const listExtractions = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const getExtractionDetails = async (extractionId) => {
  const response = await axios.get(`${API_URL}/${extractionId}`);
  return response.data.data;
};

export const pauseExtraction = async (extractionId) => {
  const response = await axios.post(`${API_URL}/${extractionId}/pause`);
  return response.data;
};
