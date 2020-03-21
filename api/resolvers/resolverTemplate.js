const { Model } = require("../database/models");
const { create, all, destroy, update, one } = require("./utils");

const modelIncludes = [{ model: IncludedModel, as: "includedModels" }];

module.exports = {
  types: {},

  queries: {
    models: all(Model, modelIncludes),
    model: one(Model, modelIncludes)
  },

  mutations: {
    createModel: create(Model, modelIncludes),
    updateModel: update(Model, modelIncludes),
    deleteModel: destroy(Model),
  }
};
