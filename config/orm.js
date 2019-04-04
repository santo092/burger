// Import MySQL connection.
const connection = require("../config/connection.js");


function printQuestionMarks(num) {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
  const arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (let key in ob) {
    let value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]

      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

var orm = {

  //READ
  selectAll: function (table, cb) {
    const queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  //CREATE
  insertOne: function (table, cols, vals, cb) {
    let queryString = "INSERT INTO " + table + "(" + cols.toString() + ") VALUES (" + printQuestionMarks(vals.length) + ") ";

    console.log(queryString);

    connection.query(queryString, vals, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  //UPDATE
  updateOne: function (table, objColVals, condition, cb) {
    let queryString = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition;

    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  }
};

module.exports = orm;
