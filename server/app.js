const express = require('express');
const cors = require('cors');
const log = require('loglevel');
const Sentry = require('@sentry/node');
const bodyParser = require('body-parser');
const HttpError = require('./utils/HttpError');
const { errorHandler, handlerWrapper } = require('./utils/utils');
const router = require('./routes');

const app = express();
const config = require('../config/config');
const { EventHandlerService } = require('./services/EventHandlerService');

// Sentry.init({ dsn: config.sentry_dsn });

if (process.env.NODE_ENV === 'development') {
  log.info('disable cors');
  app.use(cors());
}

/*
 * Check request
 */
app.use(
  handlerWrapper(async (req, _res, next) => {
    if (
      req.method === 'POST' ||
      req.method === 'PATCH' ||
      req.method === 'PUT'
    ) {
      if (req.headers['content-type'] !== 'application/json') {
        throw new HttpError(
          415,
          'Invalid content type. API only supports application/json',
        );
      }
    }
    next();
  }),
);

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// routers
app.use('/', router);
// Global error handler
app.use(errorHandler);
const { version } = require('../package.json');

app.get('*', function (req, res) {
  res.status(200).send(version);
});

const eventHandlerService = new EventHandlerService();
// (async () => {
//   await eventHandlerService.registerEventHandlers();
// })();

module.exports = app;
