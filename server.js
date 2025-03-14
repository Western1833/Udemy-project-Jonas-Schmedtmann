const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app.js');

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));