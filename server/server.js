require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const log = require('loglevel');
// setup log level
require('./setup');
const app = require('./app');

const port = process.env.NODE_PORT || 3006;
// const { knex, knexLegacyDB } = require('./infra/database/knex');
// const RabbitMQ = require('./infra/RabbitMQ/RabbitMQ');

app.listen(port, () => {
  log.info(`listening on port:${port}`);
  log.debug('debug log level!');
});

// process.once('SIGINT', async function () {
//   const rabbitmq = new RabbitMQ();
//   await rabbitmq.init();
//   log.log('Terminate request received...');
//   rabbitmq.teardownBroker();
//   knex.destroy();
//   knexLegacyDB.destroy();
//   server.close();
// });
