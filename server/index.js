const express = require("express");
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan");
const helmet = require('helmet');
const { response } = require('./src/middleware/common.js');
const app = express();
const port = process.env.PORT;
const mainRouter = require('./src/routes/index.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
  origin : "http://localhost:3000", 
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan("dev"));
app.use('/', mainRouter);

app.all('*', (req, res, next) => {
  response(res, 404, false, null, '404 Not Found');
});

app.get('/H', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
