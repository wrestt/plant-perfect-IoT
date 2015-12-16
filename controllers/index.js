require('./air');
require('./light');
require('./pi')
require('./soil');
require('./water')

app.get('*', function(req, res) {
  console.log('***********************************************************');
  res.render('index.html.ejs');
});
