/*jshint esversion:6*/
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
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
  saved:{
    type: Boolean,
    default: false
  },
  //table joins????
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'note'
  }
});
ArticleSchema.plugin(uniqueValidator);
ArticleSchema.methods.saveArticle = function() {
    this.saved = true;
    return this.saved;
};

//Create the article model with the ArticleSchema
let Article = mongoose.model('Article', ArticleSchema);

//lets export this model
module.exports = Article;
