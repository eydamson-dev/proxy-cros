let express = require('express');
let makeRequest = require('../makeRequest');
const router = express.Router();
const { API_HOST } = require('../config');

// list
router.get('/products', async (req, res) => {
  let url = `${API_HOST}/products`;
  let headers = req.headers;
  let config = {
    url,
    headers: {
      withCredentials: true,
      Cookie: headers.cookie,
    },
    params: {
      ...req.query,
    },
  };

  try {
    let response = await makeRequest(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({error});
  }
});

// single
router.get('/product', async (req, res) => {
  let url = `${API_HOST}/product`;
  if(req.query.uuid) {
    url = `${url}?uuid=${req.query.uuid}`;
  }

  let headers = req.headers;
  let config = {
    url,
    headers: {
      withCredentials:true,
      Cookie: headers.cookie
    }
  };

  try {
    let response = await makeRequest(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({error});
  }
});

// update
router.put("/product", async (req, res) => {
  let url = `${API_HOST}/product`;
  let headers = req.headers;
  let config = {
    url,
    headers: {
      withCredentials: true,
      Cookie: headers.cookie,
    },
    method: "PUT",
    data: req.body,
    params: {
      uuid: req.query.uuid,
    },
  };

  try {
    let response = await makeRequest(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// create
router.post("/product", async (req, res) => {
  let url = `${API_HOST}/product`;
  let headers = req.headers;
  let config = {
    url,
    headers: {
      withCredentials: true,
      Cookie: headers.cookie,
    },
    method: "POST",
    data: req.body,
  };

  try {
    let response = await makeRequest(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;