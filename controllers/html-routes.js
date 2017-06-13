/*jshint esversion:6*/
//express Dependencies
const express = require('express');
const router = express.Router();
//DB Dep adding our models
let Article = require('../models/article.js');
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

router.get('/saved', (req, res) => {
  // Article.find({}, (err, art) => {
  //   console.log(art.length);
  //   console.log(art);
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.render('saved', {
  //       article: art
  //
  //     });
  //   }
  // });
  Article.find({ "saved": true })
  // ..and populate all of the notes associated with it
  .populate("comment")
  // now, execute our query
  .exec(function(error, art) {
    // Log any errors
    if (error) {
      console.log(error);
    }

    else {
      console.log(art);
      res.render('saved', {
           article: art

         });
    }
  });
});







module.exports = router;
