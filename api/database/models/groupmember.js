'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    group_id: DataTypes.INTEGER,
    member_id: DataTypes.INTEGER
  }, {});
  GroupMember.associate = function(models) {
    GroupMember.belongsTo(models.Artist, {
      foreignKey: "group_id",
      as: "group"
    });

    GroupMember.belongsTo(models.Artist, {
      foreignKey: "member_id",
      as: "member"
    });
  };
  return GroupMember;
};