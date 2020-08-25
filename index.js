const express = require('express');
const axios = require('axios');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

let host_api = 'https://app-dev.pem.blss.com.au/api';


const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', req.header('origin') );
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


app.post('/api/login', async (req, res) => {
  try {
    let url = `${host_api}/login`;
    let response = await axios.post(url, req.body);
    let cookie = response.headers['set-cookie'][0]
    cookie = cookie.split(';');
    cookie = cookie[0];
    let cookieVal = cookie.split('=')[1];

    res.cookie('app-dev.pem.blss.com.au', cookieVal);
    res.json(response.data);
  } catch (error) {
    res.status(401).json({status:401, error: error.message,message:'Bad credentials'});
  }
});

app.get('/api/logout', async (req, res)=> {
  try {
    let url = `${host_api}/logout`;
    let response = await axios.get(url);
    res.json(response.data);
  } catch(error) {
    console.log(error);
    res.status(401).json({status:500, error: error.message,message:'Error in server'});
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
