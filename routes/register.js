let express = require('express');
let makeRequest = require('../makeRequest');
const router = express.Router();
const { API_HOST } = require('../config');

router.post('/register', async (req, res) => {
  try {
    let url = `${API_HOST}/register`;
    let response = await axios.post(url, req.body);
    res.json(response.data);
  } catch (error) {
    let data = error.response.data;
    res.status(400).json(data);
  }
});

module.exports = router;