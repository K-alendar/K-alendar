const { Model } = require("../database/models");
const { create, all, destroy, update, one, associations } = require("./utils");

module.exports = {
  types: {
    Model: {
      ...associations.has("someModels"),
      ...associations.belongsToAn("otherModel")
    }
  },

  queries: {
    models: all(Model),
    model: one(Model)
  },

  mutations: {
    createModel: create(Model),
    updateModel: update(Model),
    deleteModel: destroy(Model)
  }
};
