
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorhandler = require('errorhandler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  stylus = require('stylus'),
  mongoose = require('mongoose');

var app = module.exports = express();

/**
 * Configuration
 */



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
mongoose.connect('mongodb://localhost/MeanBlog', function(err) {
  if(err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});
app.use(
    stylus.middleware({
      src:  __dirname + "/public",
      dest: __dirname + "/public/stylesheets",
      debug: true,
      compile : function(str, path) {
        console.log('compiling');
        return stylus(str)
          .set('filename', path)
          .set('warn', true)
          .set('compress', true);
      }
    })
);

app.use(express.static(path.join(__dirname, '/public')));


var env = process.env.NODE_ENV || 'development';


// development only
if (env === 'development') {
  app.use(errorhandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/posts', api.posts);

app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);
// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
