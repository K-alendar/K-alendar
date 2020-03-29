const { RecordNotFoundError } = require("../errors");

function checkIfFound(model, id) {
  if (model === null) {
    throw new RecordNotFoundError(
      `A record wasn't found with the primary key '${id}'`
    );
  }
}

function buildOptions(include = [], attributes = []) {
  options = {};

  if (include.length > 0) {
    options.include = include;
  }

  if (attributes.length > 0) {
    options.attributes = attributes;
  }

  return options;
}

async function findOne(Model, id, include, __forceSelectFields = []) {
  let options = buildOptions(
    (include = include),
    (attributes = __forceSelectFields)
  );

  let model = await Model.findByPk(id, options);

  checkIfFound(model, id);

  return model;
}

module.exports = {
  one: (Model, { include = [], __forceSelectFields = [] } = {}) => {
    return async (_, { id }) => {
      let model = await findOne(Model, id, include, __forceSelectFields);
      return model;
    };
  },

  create: (
    Model,
    { include = [], transformer = v => v, __forceSelectFields = [] } = {}
  ) => {
    return async (_, values) => {
      let model = await Model.create(transformer(values));
      return await findOne(
        Model,
        model.id,
        include,
        (fields = __forceSelectFields)
      );
    };
  },

  all: (Model, { include = [], __forceSelectFields = [] } = {}) => {
    return async () => {
      let options = buildOptions(
        (include = include),
        (attributes = __forceSelectFields)
      );
      return await Model.findAll(options);
    };
  },

  destroy: Model => {
    return async (_, { id }) => {
      let model = await Model.findByPk(id);
      await model.destroy();
      return model;
    };
  },

  update: (
    Model,
    { include = [], transformer = v => v, __forceSelectFields = [] } = {}
  ) => {
    return async (_, { id, ...values }) => {
      await Model.update(transformer(values), { where: { id: id } });
      return await findOne(Model, id, include, __forceSelectFields);
    };
  }
};
