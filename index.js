const express = require('express');
var cookieParser = require('cookie-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();

let host_api = 'https://app-dev.pem.blss.com.au/api';

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', req.header('origin') );
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

async function makeRequest(config) {
  return new Promise(async (resolve, reject)=> {
    try {
      let res = await axios(config);
      resolve(res);
    } catch (error) {
      if (error.response) {
        /*
        * The request was made and the server responded with a
        * status code that falls out of the range of 2xx
        */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        reject(error.response.data);
      } else if (error.request) {
        /*
        * The request was made but no response was received, `error.request`
        * is an instance of XMLHttpRequest in the browser and an instance
        * of http.ClientRequest in Node.js
        */
        console.log(error.request);
        reject(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
        reject(error.message);
      }
    }
  });
}

app.post('/api/login', async (req, res) => {
  try {
    let url = `${host_api}/login`;
    let response = await makeRequest({
      url,
      method:'post',
      data:req.body
    });

    let cookie = response.headers['set-cookie'][0]
    cookie = cookie.split(';');
    cookie = cookie[0];
    let cookieVal = cookie.split('=')[1];

    res.cookie('app-dev.pem.blss.com.au', cookieVal);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/logout', async (req, res)=> {
  try {
    let url = `${host_api}/logout`;
    let response = await makeRequest({url});
    res.json(response.data);
  } catch(error) {
    res.status(500).json({error});
  }
});


app.post('/api/register', async (req, res) => {
  try {
    let url = `${host_api}/register`;
    let response = await axios.post(url, req.body);
    res.json(response.data);
  } catch (error) {
    let data = error.response.data;
    res.status(400).json(data);
  }
});

app.get('/api/products', async (req, res)=>{
  let url = `${host_api}/products`;
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


app.get('/api/product', async (req, res) => {
  let url = `${host_api}/product`;
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

app.put('/api/product', async (req, res) => {
  let url = `${host_api}/product`;
  let headers = req.headers;
  let config = {
    url,
    headers: {
      withCredentials:true,
      Cookie: headers.cookie
    },
    method:'PUT',
    data: req.body,
    params: {
      uuid: req.query.uuid
    }
  };

  try {
    let response = await makeRequest(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({error});
  }
});

app.get('/api/stores', async (req, res) => {

  let url = `${host_api}/stores`;
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

app.get('/api/store', async (req, res) => {

  console.log(req.query.uuid);
  res.json('');
  return;
  let url = `${host_api}/stores`;
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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
