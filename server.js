var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('cookie-session');
var config = require('./env.json')[process.env.NODE_ENV || 'production'];
var dbUsername = config.PLANTDATA_USERNAME;
var dbPassword = config.PLANTDATA_PASSWORD;
var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://' + dbUsername + ':' + dbPassword + '@localhost:5432/plantdata',
  searchPath: 'knex,public'
});
var bookshelf = require('bookshelf')(knex);

require('./controllers/index');

apiRouter = express.Router();
app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.static(__dirname + '/app'));

app.get('*', function(req, res) {
  res.render('index.html.ejs');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server is listening on port ' + process.env.PORT || 3000);
});
