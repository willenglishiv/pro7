import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import config from './webpack.config.babel.js'

//routes
import index from './src/server/routes/index'
import users from './src/server/routes/users'

const app = express();

const compiler = webpack(config);

// view engine setup
app.set('views', path.join(__dirname, 'src','server','views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(ROOT_FOLDER, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/expresshome', index);
app.use('/users', users);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Use client index
app.use('/',(req,res,next) => {
  res.sendFile(path.join(__dirname,'src','client') + '/test.html')
})


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app
