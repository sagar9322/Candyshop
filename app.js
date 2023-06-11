const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

const sequelize = require('./util/database');


const sellerRoutes = require('./routes/sellerRoutes');
app.use(sellerRoutes);

// Start the server
sequelize
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });