/*jshint esversion:6*/
//express Dependencies
const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
//DB Dep adding our models
let Article = require('../models/article.js');
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

res.redirect('/');
});
router.get('/delete/:id', (req, res) => {

  Article.findOneAndUpdate({ "_id": req.params.id }, {$set:{saved:"false"}}, {new: true}, function(err, art){
      if(err){
          console.log("Something wrong when updating data!");
      }

      console.log(art);
  });

res.redirect('/saved');
});

// router.get("/comment/:id", function(req, res) {
//   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//   Article.findOne({ "_id": req.params.id })
//   // ..and populate all of the notes associated with it
//   .populate("comment")
//   // now, execute our query
//   .exec(function(error, doc) {
//     // Log any errors
//     if (error) {
//       console.log(error);
//     }
//
//     else {
//       console.log(doc);
//       // console.log(res.body);
//       // res.redirect('/saved');
//     }
//   });
// });

// Create a new note or replace an existing note
router.post("/comment/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry

  var newComment = new Comment(req.body);
  console.log(newComment);
  // And save the new note the db
  newComment.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // { "_id": req.params.id }, { "comment": doc._id }=======for reference later
    // Otherwise
    else {
      // Use the article id to find and update it's note
      Article.findOneAndUpdate({ "_id": req.params.id }, { $push: { "comment": doc._id } }, { new: true })
      // Execute the above query
      .exec(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        else {
          // Or send the document to the browser
        res.redirect('/saved');
        }
      });
    }
  });
});




module.exports = router;
