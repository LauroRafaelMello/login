const express = require('express');
const router = express.Router();
const {createUser, loginUser, users} = require('../database/users');

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

// this endpoint get all users from database
router.get('/users', (req, res) => {
  users().then((rows) => {
    if(rows) {
      res.json(rows).status(200);
    } else {
      res.json({"status":"200", "message":"rows are missing!"});
    }
  })
})

// this endpoint receive login and password from frontend
router.post('/signin', (req, res) => {
  const {login, pass} = req.body;
  loginUser(login, pass).then((rows) => {
    if(rows) {
      res.json({"status":"200", "message":"Login succsess!"}).status(200);
    } else {
      res.json({"status":"401", "message":"Login or password is are incorrect!"}).status(401);
    };
  }).catch((err) => {
    console.error(err);
  });
});

module.exports = router;