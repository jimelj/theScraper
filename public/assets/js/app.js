// $.getJSON('/api/articles', function(articles){
//
//   for (var i = 0; i < articles.length; i++) {
//     console.log(articles[i]);
//   }
//
// });
console.log('app.js');
$(document).on('click','.btn', function(){

  $('.alert').show();
  console.log('button fired');
});
