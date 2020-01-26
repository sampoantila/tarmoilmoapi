import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import index from './routes/index';
import authenticate from './routes/authenticate';
import logger from 'morgan';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';

const app = express();

if (app.get('env') === 'development') {
  const result = dotenv.config({ path: '.env.local'});
  console.log('### Development environment')
  console.log(result);
  app.use(logger('dev')); // morgan loggin with dev settings
} else {
  // production
  console.log('### Production');
  app.use(cors()); // apply cors protection
  app.use(logger('common')); // morgan loggin with common settings
  app.use(compression()); // compress http responses to speed up transfer time
  app.use(helmet()); // protect some well-known vulnerabilities
}

process.on('uncaughtException', e => {
    console.log(e);
    process.exit(1);
});

process.on('unhandledRejection', e => {
    console.log(e);
    process.exit(1);
});

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup headers for CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.use('/', index);
app.use('/authenticate', authenticate);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  res.statusCode = 404;
  next(err);
});

app.set('port', process.env.PORT || 4000);
const PORT = app.get('port');

app.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}...`));
