'use strict';

// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class DataCollection {
  constructor(model) {
    this.model = model;
  }

  get(id) {
    if (id) {
      return this.model.findOne({ id });
    }
    else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }

  // update(id, data) {
  //   return this.model.findOne({ where: { id } })
  //     .then(record => record.update(data));
  // }

  async update(id, data) {
    let record = await this.model.findOne({ where: { id } });
    return record.update(data);
  }

  delete(id) {
    return this.model.destroy({ where: { id }});
  }
}

module.exports = DataCollection;
