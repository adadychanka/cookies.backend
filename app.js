require('dotenv').config();

const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(4000);
