/**
 * Contains functions used to process various incoming events subscribed in the application
 * and update the status of the domain event.
 */
const log = require('loglevel');
const Session = require('../infra/database/Sessions/Session');
const DomainEvent = require('../models/DomainEvent');
const RawCapture = require('../models/RawCapture');
// const QueueService = require('./QueueService');

const DictEventHandlers = Object.freeze({
  CaptureCreated: async (payload, session) => {
    const rawCapture = new RawCapture(session);
    await rawCapture.applyVerification(payload);
  },
});

class EventHandlerService {
  constructor() {
    this._session = new Session();
  }

  // async registerEventHandlers() {
  //   const queueService = new QueueService();
  //   await queueService.init();
  //   queueService.subscribeToCaptureCreationEvent((message) =>
  //     this.processMessage(DictEventHandlers.CaptureCreated, {
  //       ...message,
  //       type: 'CaptureCreated',
  //     }),
  //   );
  // }

  async applyEventHandler(eventHandler, domainEvent) {
    const domainEventModel = new DomainEvent(this._session);
    try {
      await this._session.beginTransaction();
      await eventHandler(domainEvent.payload, this._session);
      await domainEventModel.update({ id: domainEvent.id, status: 'handled' });
      await this._session.commitTransaction();
    } catch (e) {
      log.error(e);
      if (this._session.isTransactionInProgress()) {
        await this._session.rollbackTransaction();
      }
    }
  }

  async processMessage(eventHandler, message) {
    const domainEventModel = new DomainEvent(this._session);
    const domainEvent = await domainEventModel.receiveEvent(message);
    this.applyEventHandler(eventHandler, domainEvent);
  }
}

module.exports = { EventHandlerService, DictEventHandlers };
