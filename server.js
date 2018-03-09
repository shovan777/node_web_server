const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('unable to find server log file');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintainence.hbs', {
    pageTitle: 'Maintainence Page',
    // currentYear: new Date().getFullYear()
  });
  next();
});

app.use(express.static(__dirname + '/public'));



hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
  // return 'test';
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (request, response) => { // '/' is the root route
  // response.send('<h1>Hello Express!</h1>');
  // response.send({
  //   name: 'Shovan',
  //   likes: [
  //     'mathematics',
  //     'writing',
  //     'tabletennis',
  //     'reading',
  //     'anime',
  //     'watching'
  //   ]
  // });
  response.render('home.hbs', {
    pageTitle: 'Homepage',
    // currentYear: new Date().getFullYear(),
    welcomeMsg: 'Hello User'
  });
});

app.get('/about', (request, response) => { // about route
  response.render('about.hbs', {
    pageTitle: 'About Page',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'server not setup'
  });
});
app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});
