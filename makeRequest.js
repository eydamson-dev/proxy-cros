const axios = require("axios");

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
        let status = error.response.status;
        let errData = error.response.data;
        console.log(`Error status: ${status}`);
        console.log(`Error data: ${errData}`);
        reject({status, data:errData});
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

module.exports = makeRequest;