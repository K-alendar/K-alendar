const crudResolvers = require("./crud");
const transformers = require("./transformers");
const associations = require("./associations");

module.exports = {
  ...crudResolvers,
  associations: associations,
  transformers: transformers
};
