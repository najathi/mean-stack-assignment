const express = require("express");

const Product = require('./models/movie');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/api/movies", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let start;
  let end;
  let count;
  if (pageSize && currentPage) {
    start = pageSize * (currentPage - 1);
    end = pageSize;
  }
  let movies = [];
  Product.fetchAll(moviesData => {
    count = moviesData.length;
    if (moviesData) {
      movies = moviesData.slice(start, end);
      res.status(200).json({
        message: "Fetched Successfully!",
        movies: movies,
        maxCount: count
      });
    }
  });
});

module.exports = app;
