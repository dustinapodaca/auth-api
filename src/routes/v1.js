'use strict';

const express = require('express');
const dataModules = require('../models');

const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

async function handleGetAll(req, res, next) {
  try {
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
  } catch (e) {
    next(e);
  }
}

async function handleGetOne(req, res, next) {
  const id = req.params.id;
  try {
    let theRecord = await req.model.get(id);
    res.status(200).json(theRecord);
  } catch (e) {
    next(e);
  }
}

async function handleCreate(req, res, next) {
  let obj = req.body;
  try {
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
  } catch (e) {
    next(e);
  }
}

async function handleUpdate(req, res, next) {
  const id = req.params.id;
  const obj = req.body;
  try {
    let updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
  } catch (e) {
    next(e);
  }
}

async function handleDelete(req, res, next) {
  let id = req.params.id;
  try {
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);
  } catch (e) {
    next(e);
  }
}

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

module.exports = router;
