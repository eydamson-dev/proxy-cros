const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const { CORS_ORIGIN } = require('./config');
const corsOptions = {
  origin: CORS_ORIGIN,
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

app.use('/api', routes.login);
app.use('/api', routes.logout);
app.use('/api', routes.register);
app.use('/api', routes.products);
app.use('/api', routes.stores);
app.use('/api', routes.payments);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
