"use strict";
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Company.associate = function(models) {
    Company.hasMany(models.Artist, {
      foreignKey: "company_id",
      as: "artists",
      onDelete: "NULLIFY"
    });
  };
  return Company;
};
