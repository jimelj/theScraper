/*jshint esversion:6*/
const mongoose = require('mongoose');
//Create the Schema Class
let Schema = mongoose.Schema;

//Create the comment Schema

let CommentSchema = new Schema({

  comment:{
    type: String
  }
});
//Create the comment model with the commentSchema
let Comment = mongoose.model('Comment', CommentSchema);

//lets export this model
module.exports = Comment;
