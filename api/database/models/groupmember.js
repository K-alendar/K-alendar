'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    group_id: DataTypes.INTEGER,
    member_id: DataTypes.INTEGER
  }, {});
  GroupMember.associate = function(models) {
    GroupMember.belongsTo(models.Artist, {
      as: "group"
    })

    GroupMember.belongsTo(models.Artist, {
      as: "member"
    })
  };
  return GroupMember;
};