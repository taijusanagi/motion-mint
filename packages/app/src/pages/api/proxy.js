import axios from "axios";

export default async (req, res) => {
  const targetURL = req.query.url;

  if (!targetURL) {
    return res.status(400).json({ error: "URL not provided." });
  }

  try {
    const response = await axios.get(targetURL);
    return res.json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json(error.response?.data || {});
  }
};
