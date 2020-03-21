const { RecordNotFoundError } = require("./errors");

function checkIfFound(model, id) {
  if (model === null) {
    throw new RecordNotFoundError(
      `A record wasn't found with the primary key '${id}'`
    );
  }
}

async function findOne(Model, id, include) {
  let model;

  if (include.length > 0) {
    model = await Model.findByPk(id, {
      include: include
    });
  } else {
    model = await Model.findByPk(id);
  }

  checkIfFound(model, id);

  return model;
}

module.exports = {
  one: (Model, include = []) => {
    return async (_, { id }) => {
      let model = await findOne(Model, id, include);
      return model;
    };
  },

  create: (Model, include = [], pk = "id") => {
    return async (_, values) => {
      let model = await Model.create(values);
      return await findOne(Model, model.id, include);
    };
  },

  all: (Model, include = []) => {
    return async () => {
      if (include.length > 0) {
        return await Model.findAll({
          include: include
        });
      } else {
        return await Model.findAll();
      }
    };
  },

  destroy: Model => {
    return async (_, { id }) => {
      let model = await Model.findByPk(id);
      await model.destroy();
      return model;
    };
  },

  update: (Model, include = []) => {
    return async (_, { id, ...values }) => {
      await Model.update(values, { where: { id: id } });
      return await findOne(Model, id, include);
    };
  }
};
