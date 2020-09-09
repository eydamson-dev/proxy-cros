let express = require('express');
let makeRequest = require('../makeRequest');
const router = express.Router();
const { API_HOST } = require('../config');

router.post("/login", async (req, res) => {
  try {
    let url = `${API_HOST}/login`;
    let response = await makeRequest({
      url,
      method: "post",
      data: req.body,
    });

    let cookie = response.headers["set-cookie"][0];
    cookie = cookie.split(";");
    cookie = cookie[0];
    let cookieVal = cookie.split("=")[1];

    res.cookie("app-dev.pem.blss.com.au", cookieVal);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;