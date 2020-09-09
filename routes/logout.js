let express = require("express");
let makeRequest = require("../makeRequest");
const router = express.Router();
const { API_HOST } = require("../config");

router.get("/logout", async (req, res) => {
  try {
    let url = `${API_HOST}/logout`;
    let response = await makeRequest({ url });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;