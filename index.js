const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const flash = require('express-flash-messages');
const expressHandlebars = require('express-handlebars');
const helpers = require('./helpers');
const profileMiddleware = require('./profile');
const config = require('./config');

const app = express();

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cookieSession({
    name: 'session',
    keys: config.keys
  })
);

app.use(flash());

const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  helpers: helpers.registered,
  partialsDir: 'views/'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(profileMiddleware);

app.get('/', (req, res) => {
  let { id, food, color } = req.cookies;
  let profile = req.profile || {};
  let name = req.profile.name || 'stranger';
  req.flash('success', `Welcome to your garden, ${name}`);
  res.render('index', { id, profile, color });
});

app.post('/customize', (req, res) => {
  res.cookie('id', req.id);
  res.cookie('food', req.food);
  res.cookie('color', req.color);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Listening at port 3000');
});
