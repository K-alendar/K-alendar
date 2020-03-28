'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    groupId: DataTypes.INTEGER,
    memberId: DataTypes.INTEGER
  }, {});
  GroupMember.associate = function(models) {
    GroupMember.belongsTo(models.Artist, {
      as: "group", foreignKey: "groupId"
    })

    GroupMember.belongsTo(models.Artist, {
      as: "member", foreignKey: "memberId"
    })
  };
  return GroupMember;
};