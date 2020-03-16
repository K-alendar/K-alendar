'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    group_id: DataTypes.INTEGER,
    member_id: DataTypes.INTEGER
  }, {});
  GroupMember.associate = function(models) {
    // associations can be defined here
  };
  return GroupMember;
};