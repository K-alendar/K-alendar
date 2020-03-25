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

  create: (Model, include = [], transformer = v => v) => {
    return async (_, values) => {
      let model = await Model.create(transformer(values));
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

  update: (Model, include = [], transformer = v => v) => {
    return async (_, { id, ...values }) => {
      await Model.update(transformer(values), { where: { id: id } });
      return await findOne(Model, id, include);
    };
  },

  _transformers: {
    parseDate: key => {
      return values => {
        let convertedDate = {};
        convertedDate[key] = values[key];
        if (convertedDate[key] && convertedDate[key].class === String) {
          convertedDate[key] = moment(
            convertedDate[key],
            "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
          ).unix();
        }
        return { ...values, convertedDate };
      };
    },
    multi: (...transformers) => {
      return values => {
        let persistentValues = values;
        for (let transformer of transformers) {
          persistentValues = transformer(persistentValues);
        }
        return values;
      };
    }
  }
};
