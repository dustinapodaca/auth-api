'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index.js');
const basicAuth = require('../auth/middleware/basic.js');
const bearerAuth = require('../auth/middleware/bearer.js');
const permissions = require('../auth/middleware/acl.js');

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, async (req, res, next) => {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (e) {
    next(e.message);
  }
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  try {
    const userRecords = await users.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    next(e.message);
  }
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  try {
    res.status(200).send('Welcome to the secret area');
  } catch (e) {
    next(e.message);
  }
});

module.exports = authRouter;
