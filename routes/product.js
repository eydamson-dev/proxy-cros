let express = require('express');
let makeRequest = require('../makeRequest');
const router = express.Router();

router.get('/', (req, res) => {
  let url = `${host_api}/products`;
  let headers = req.headers;
  let config = {
    url,
    headers: {
      withCredentials:true,
      Cookie: headers.cookie
    }
  };

  console.log('prdocuts', config);

  try {
    let response = makeRequest(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({error});
  }
});

module.exports = router;