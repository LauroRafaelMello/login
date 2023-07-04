const express = require('express');
const router = express.Router();
const {createUser, loginUser} = require('../database/users');

// this endpoint test the connection by terminal with server
router.get('/', (req, res) => {
  res.json({"status":"200", "message":"Connected with success"}).status(200);
});

// this endpoint create a user in database
router.post('/signup', (req, res) => {
  const {login, pass} = req.body;
  createUser({login:login, pass: pass})
  .then((userID) => {
    res.json({"status":"200", "message":"User was create with ID: " + userID}).status(200);
  }).catch((err) => {
    console.error(err);
    res.json({"status":"500","message":"Internal server error!"}).status(500);
  });
});


// this endpoint receive login and password from frontend
router.post('/signin', (req, res) => {
  const {login, pass} = req.body;
  console.log(`Login: ${login}\n pass: ${pass}`);
  loginUser(login, pass).then((rows) => {
    if(rows) {
      res.json({"status":"200", "message":"Login sucsess!"}).status(200);
    } else {
      res.json({"status":"401", "message":"Login or password is are incorrect!"}).status(401);
    };
  }).catch((err) => {
    console.error(err);
  });
});

module.exports = router;