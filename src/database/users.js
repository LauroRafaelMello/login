const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const saltRounds = 10;


const createUser = async (user) => {
  return await new Promise((resolve, reject) => {
    const dbPath = path.join(__dirname, 'database.db');
    const db = new sqlite3.Database(dbPath);
    const {login, pass} = user;

    bcrypt.hash(pass, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      const query = "INSERT INTO users(login, password) VALUES (?, ?)";
      db.run(query, [login, hashedPassword], function(err) {
        if(err) {
          console.error(err);
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
      db.close();
    });
  });
};

const loginUser = async(login, pass) => {
  return await new Promise((resolve, reject) => {
    const dbPath = path.join(__dirname, 'database.db');
    const db = new sqlite3.Database(dbPath);

    const query = "SELECT * FROM users WHERE login = ?";
    db.get(query, [login], (err, row) => {
      if(err) {
        console.error(err);
        reject(err);
        
      } else {
        if (row) {
          const hashedPassword = row.password;
          bcrypt.compare(pass, hashedPassword, (err, result) => {
            if(err) {
              console.error(err);
              return;
            }
            if (result) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
        };
      };
    });
    db.close();
  });
}

const users = async () => {
  return await new Promise((resolve, reject) => {
    const dbPath = path.join(__dirname, 'database.db');
    const db = new sqlite3.Database(dbPath);
    const query = "SELECT * FROM users";
    db.all(query, (err, row) => {
      if(err) {
        console.error(err);
        reject(err)
      } else {
        resolve(row)
      };
    });
  });
};

module.exports = {createUser, loginUser, users};