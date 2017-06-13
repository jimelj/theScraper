/*jshint esversion:6*/
//express Dependencies
const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
//DB Dep adding our models
let Article = require('../models/Article.js');
let Comment = require('../models/comment.js');

//Route to scrape macrumors.com
router.get('/scraper', (req, res) => {
  request('https://www.macrumors.com/', (err, respond, html) => {
    let $ = cheerio.load(html);
    // console.log(html);
    $('#mainContainer .article').each(function(i, element) {
      let result = {};
      result.title = $(this).children("h2").children('a').text();
      result.link = $(this).children("h2").children('a').attr("href");
      result.content = $(this).children('.content').text();
      // console.log(result);

      let oneArticle = new Article(result);

      oneArticle.save(function(err, input) {
        if (err) {
          console.log(err);
        } else {
          console.log(input);
        }
      });
    });
  });
  res.redirect('/');
});
//Get all Articles from mongo
router.get('/articles', (req, res) => {

  Article.find({}, (err, art) => {
    if (err) {
      console.log(err);
    } else {
      res.json(art);
    }
  });

});

router.get('/save/:id', (req, res) => {

  Article.findOneAndUpdate({ "_id": req.params.id }, {$set:{saved:"true"}}, {new: true}, function(err, art){
      if(err){
          console.log("Something wrong when updating data!");
      }

      console.log(art);
  });

Article.findOneAndUpdate({ "_id": req.params.id },(err,art) =>{
  if (err) {
    console.log(err);
  } else {
    Article.saveArticle();
  }
});
res.redirect('/');
});








module.exports = router;
