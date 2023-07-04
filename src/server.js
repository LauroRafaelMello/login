const express = require('express');
const app = express();
const router = require('./routes/routes');
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});