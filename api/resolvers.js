const { Artist, Company } = require("./database/models");

module.exports = {
  Query: {
    companies: () =>
      Company.findAll({ include: { model: Artist, as: "artists" } }),
    artists: () =>
      Artist.findAll({ include: [
        { model: Company, as: "company" },
        { model: Artist, as: "members", through: "GroupMembers" },
        { model: Artist, as: "groups", through: "GroupMembers" }
      ] })
  }
};
