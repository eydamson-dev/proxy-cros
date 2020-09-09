let express = require("express");
let makeRequest = require("../makeRequest");
const router = express.Router();
const { API_HOST } = require("../config");

// list
router.get("/payment-gateways", async (req, res) => {
  let url = `${API_HOST}/payment-gateways`;
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
    res.json({
      data: {
        page: {
          page_size: 7,
          page_number: 1,
          page_total: 1,
          total_elements: 7,
        },
        payment_gateways: [
          {
            id: 27,
            provider: "ACI",
            mode: "SANDBOX",
            name: "ACI_0",
            paypal: null,
            status: 1,
          },
          {
            id: 28,
            provider: "ACI",
            mode: "LIVE",
            name: "ACI_1",
            paypal: null,
            status: 1,
          },
          {
            id: 40,
            provider: "PAYPAL",
            mode: "SANDBOX",
            name: "Create via API1",
            paypal: {
              client_iD:
                "AbvaSmaINfFHI1Tklld1y2QDhmkW1UG80Ed7c8z1WbgQ7NNt-ei8ZmHjD4e3tZt2E_QpPBxcn4AMyLlZ",
              secret_iD:
                "EIZ-B3JSn2fA80dzSPZg8lZ6dNHx5yO4dUbCkuGCEH4E4mTnq-jdz933qpJ3IRQMB8v1yuX0Jv5HxqgQ",
            },
            status: 0,
          },
          {
            id: 29,
            provider: "PAYPAL",
            mode: "SANDBOX",
            name: "Paypal New Record",
            paypal: {
              client_iD: "cba",
              secret_iD: "321",
            },
            status: 1,
          },
          {
            id: 30,
            provider: "PAYPAL",
            mode: "SANDBOX",
            name: "Paypal New Record_3",
            paypal: {
              client_iD: "1234567",
              secret_iD: "7654321",
            },
            status: 1,
          },
          {
            id: 31,
            provider: "PAYPAL",
            mode: "SANDBOX",
            name: "Paypal New Record_4",
            paypal: {
              client_iD: "1234567",
              secret_iD: "7654321",
            },
            status: 1,
          },
          {
            id: 26,
            provider: "PAYPAL",
            mode: "SANDBOX",
            name: "PAYPAL_0",
            paypal: {
              client_iD:
                "AbvaSmaINfFHI1Tklld1y2QDhmkW1UG80Ed7c8z1WbgQ7NNt-ei8ZmHjD4e3tZt2E_QpPBxcn4AMyLlZ",
              secret_iD:
                "EIZ-B3JSn2fA80dzSPZg8lZ6dNHx5yO4dUbCkuGCEH4E4mTnq-jdz933qpJ3IRQMB8v1yuX0Jv5HxqgQ",
            },
            status: 1,
          },
        ],
      },
      message: "OK",
      path: "/api/payment-gateways",
      timestamp: "1599530227",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/payment-gateway', async (req, res) => {
  let url = `${API_HOST}/payment-gateway`;
  if(req.query.id) {
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
    res.status(500).json({error});
  }
});

module.exports = router;
