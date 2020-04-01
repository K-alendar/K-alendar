function generateFunctionName(verb, objectName) {
  let adjustedObjectName =
    objectName.charAt(0).toUpperCase() +
    objectName
      .split("")
      .slice(1)
      .join("");
  return `${verb}${adjustedObjectName}`;
}

const createReadAssociation = (objectName, { as } = {}) => {
  let associationObj = {};
  associationObj[as ? as : objectName] = async parent => {
    return parent[generateFunctionName("get", objectName)]();
  };
  return associationObj;
};

const writeAssociation = async (objectName, parent, values) => {
  return parent[generateFunctionName("create", objectName)](values);
};

const updateAssociation = async (objectName, parent, values) => {
  let association = await parent[generateFunctionName("get", objectName)]();

  if (association instanceof Array) {
    return;
  }
  
  return await association.update(values);
};

const associations = {
  createReadAssociation: createReadAssociation,
  writeAssociation: writeAssociation,
  updateAssociation: updateAssociation
};

module.exports = associations;
