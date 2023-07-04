const express = require('express');
const app = express();
const router = require('./routes/routes');
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});