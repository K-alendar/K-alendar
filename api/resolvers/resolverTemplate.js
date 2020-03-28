const { Model } = require("../database/models");
const { create, all, destroy, update, one } = require("./utils");

const modelIncludes = [{ model: IncludedModel, as: "includedModels" }];

module.exports = {
  types: {},

  queries: {
    models: all(Model, { include: modelIncludes }),
    model: one(Model, { include: modelIncludes })
  },

  mutations: {
    createModel: create(Model, { include: modelIncludes }),
    updateModel: update(Model, { include: modelIncludes }),
    deleteModel: destroy(Model)
  }
};
