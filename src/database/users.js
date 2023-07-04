const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const createUser = async (user) => {
  return await new Promise((resolve, reject) => {
    const dbPath = path.join(__dirname, 'database.js');
    const db = new sqlite3.Database(dbPath);
    const {login, pass} = user;
    const query = "INSERT INTO users(login, password) VALUES (?, ?)";
    db.run(query, [login, pass], function(err) {
      if(err) {
        console.error(err);
        reject(err);
      } else {
        resolve.this(this.lastID);
      }
    });
    db.close();
  });
};

const loginUser = async(login, pass) => {
  return await new Promise((resolve, reject) => {
    const dbPath = path.join(__dirname, 'databaes.db');
    const db = new sqlite3.Database(dbPath);
    const query = "SELECT * FROM users WHERE login = ? and password = ?";
    db.get(query, [login, pass], (err, row) => {
      if(err) {
        console.error(err);
        reject(err);
        
      } else {
        if (row) {
          resolve(true);
        } else {
          resolve(false); 
        };
      };
    });
    db.close();
  });
}

module.exports = {createUser, loginUser};