const express = require('express');
const port = 5050;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from server side');
});

app.listen(port, () => console.log(`Server is listening on port ${port}...`));