/*jshint esversion:6*/
//express Dependencies
const express = require('express');
const router = express.Router();
//DB Dep adding our models
let Article = require('../models/Article.js');
let Comment = require('../models/comment.js');

router.get('/', (req, res) => {
  Article.find({}, (err, art) => {
    console.log(art.length);
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        article: art
      });
    }
  });
});







module.exports = router;
