
const Queue = require('bull');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');

const { ExpressAdapter } = require('@bull-board/express');

const someQueue = new Queue('minha-fila', {
  redis: { port: 6379, host: 'localhost'},
}); 

const serverAdapter = new ExpressAdapter();

serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullAdapter(someQueue)],
  serverAdapter: serverAdapter,
});

module.exports = {someQueue, serverAdapter}