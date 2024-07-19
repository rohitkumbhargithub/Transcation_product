const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');


const __variableOfChoice = path.resolve();
dotenv.config();
const port = process.env.PORT || 5000;

app.use(cors());

const dbConnection = require('./db/dbConnection.js');
const productRoute = require('./routes/productRoute.js');


app.use(bodyParser.urlencoded({extended:false}));

app.use('/product', productRoute);


app.use(express.static(path.join(__variableOfChoice,"/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__variableOfChoice, "frontend", "dist", "index.html"));
})


app.listen(port, () => {
    dbConnection();
  console.log(`Server is running at http://localhost:${port}`);
});