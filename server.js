var express = require('express');
var bodyparser = require('bodyparser');
var methodOverride = require('method-override');
var session = require('cookie-session');


app.get('*', function(req, res) {
  res.render('index.html.ejs');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server is listening on port ' + process.env.PORT || 3000);
});
