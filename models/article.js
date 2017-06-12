/*jshint esversion:6*/
const mongoose = require('mongoose');
//Create the Schema Class
let Schema = mongoose.Schema;

//Create the techArticle Schema

let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  content:{
    type: String,
    unique: true
  },
  //table joins????
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'note'
  }
});

//Create the article model with the ArticleSchema
let Article = mongoose.model('Article', ArticleSchema);

//lets export this model
module.exports = Article;
