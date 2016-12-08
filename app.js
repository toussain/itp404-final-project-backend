var dotenv = require('dotenv');
dotenv.config();

var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var cors = require('cors');
var bodyParser = require('body-parser');
var Twitter = require('twitter');
// var twitter = require('./api/twitter');

var DB_NAME = process.env.DB_NAME;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST
});

//CLASSES
var Class = sequelize.define('class', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  className: {
    type: Sequelize.STRING,
    field: 'class_name'
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  units: {
    type: Sequelize.INTEGER
  }
}, {
    timestamps: false
});

app.use(cors());
//app.use(bodyParser());


app.get('/api/classes', function (request, response) {
  var promise = Class.findAll();
  promise.then(function(classes){
    response.json({
      classes: classes
    });
  });
});

app.listen(3000)

//STUDENT ORGANIZATIONS
var organization = sequelize.define('organization', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  acronym: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  website: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  }

}, {
    timestamps: false
});

app.get('/api/organizations', function (request, response) {
  var promise = organization.findAll();
  promise.then(function(organization){
    response.json({
      organizations: organization
    });
  });
});

//TWITTER
app.get('/api/twitter', function (request, response) {
  var Twitter = require('twitter');

  var client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.token_key,
    access_token_secret: process.env.token_secret
  });

  var params = {screen_name: 'viterbistudent' };
  client.get('statuses/user_timeline', params, function(error, tweets) {
    if (!error) {
      response.json(tweets);
    }
  });
});
