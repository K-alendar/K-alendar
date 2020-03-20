'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    groupID: DataTypes.INTEGER,
    memberID: DataTypes.INTEGER
  }, {});
  GroupMember.associate = function(models) {
    GroupMember.belongsTo(models.Artist, {
      foreignKey: "memberID",
      as: "group"
    });

    GroupMember.belongsTo(models.Artist, {
      foreignKey: "memberID",
      as: "member"
    });
  };
  return GroupMember;
};