const makeAssociation = (objectName, { as } = {}) => {
  let associationObj = {};
  associationObj[as ? as : objectName] = async parent => {
    let adjustedObjectName =
      objectName.charAt(0).toUpperCase() +
      objectName
        .split("")
        .slice(1)
        .join("");
    return parent[`get${adjustedObjectName}`]();
  };
  return associationObj;
};

const writeAssociation = async (objectName, parent, values) => {
  let adjustedObjectName =
    objectName.charAt(0).toUpperCase() +
    objectName
      .split("")
      .slice(1)
      .join("");
    console.log(parent, `create${adjustedObjectName}`)
  return parent[`create${adjustedObjectName}`](values);
};

const associations = {
  makeAssociation: makeAssociation,
  writeAssociation: writeAssociation,
};

module.exports = associations;
