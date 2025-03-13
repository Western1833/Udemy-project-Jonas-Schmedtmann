const express = require('express');
const port = 5050;

const app = express();

app.listen(port, () => console.log(`Server is listening on port ${port}...`));