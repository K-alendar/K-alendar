const makeAssociation = (objectName, { as } = {}) => {
  let associationObj = {};
  associationObj[as ? as : objectName] = async parent => {
    let adjustedObjectName =
      objectName.charAt(0).toUpperCase() +
      objectName
        .split("")
        .slice(1)
        .join("");
    console.log(adjustedObjectName);
    return parent[`get${adjustedObjectName}`]();
  };
  return associationObj;
};

const associations = {
  has: makeAssociation,
  hasA: makeAssociation,
  hasAn: makeAssociation,
  belongsTo: makeAssociation,
  belongsToA: makeAssociation,
  belongsToAn: makeAssociation
};

module.exports = associations;
