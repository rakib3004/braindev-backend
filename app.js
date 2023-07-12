
require("dotenv").config();

const connectToMongo = require('./configs/mongoose.config');
connectToMongo();
const express = require('express');
const app = express();
const indexRouter = require('./routes/index.route');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", indexRouter);

app.use((err, req, res, next) => {
  if (!err) {
      return next();
  }
 res.status(err.statusCode).send(err.message);
});


app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Page not found',
    error: {
      message: 'You reached a route that is not defined on this server',
    },
  });
});


app.listen(PORT, HOST, () => {
  console.log("Server is connected", PORT, HOST);
});