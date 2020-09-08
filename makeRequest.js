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

module.exports = makeRequest;