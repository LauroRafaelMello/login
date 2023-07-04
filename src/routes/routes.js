const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({"status":"200", "message":"Conectado com sucesso"}).status(200);
});

module.exports = router;