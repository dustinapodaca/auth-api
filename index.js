'use strict';

require('dotenv').config();
const app = require('./src/server.js');
const { db } = require('./src/models/index.js');

// db.sync().then(() => {
//   app.start(process.env.PORT || 3001);
// });

const startServer = async () => {
  try {
    await db.sync();
    app.start(process.env.PORT || 3001);
  } catch (e) {
    console.error('Could not start server', e.message);
  }
};

startServer();
