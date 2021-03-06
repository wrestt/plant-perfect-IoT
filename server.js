var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('cookie-session');
var _ = require('lodash');

apiRouter = express.Router();
app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/bower_components'));

require('./controllers/index');

app.get('*', function(req, res) {
  res.render('index.html.ejs');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server is listening on port ' + process.env.PORT || 3000);
});
