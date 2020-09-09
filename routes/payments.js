let express = require("express");
let makeRequest = require("../makeRequest");
const router = express.Router();
const { API_HOST } = require("../config");
const inflector = require('inflected');

const model = 'payment-gateway';
const modelPlural = inflector.pluralize(model);

// list
router.get(`/${modelPlural}`, async (req, res) => {
  let url = `${API_HOST}/${modelPlural}`;
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
    console.log(error);
    res.status(error.status).json(error.data);
  }
});

// single
router.get(`/${model}`, async (req, res) => {
  let url = `${API_HOST}/${model}`;
  if(req.query.id) {
    // url = `${url}?id=${req.query.id}`;
    url = `${url}?id=${req.query.id}`;
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
    res.status(error.status).json(error.data);
  }
});

// update
router.put(`/${model}`, async (req, res) => {
  let url = `${API_HOST}/${model}`;
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
      id: req.query.id,
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
router.post(`/${model}`, async (req, res) => {
  let url = `${API_HOST}/${model}`;
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
