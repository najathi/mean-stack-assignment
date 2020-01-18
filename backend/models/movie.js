const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'data', 'movies.json');

const getMoviesFormFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.log(err);
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
}

module.exports = class Product {
  static fetchAll(cb) {
    getMoviesFormFile(cb);
  }
}




