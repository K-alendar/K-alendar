const { RecordNotFoundError, writeErrorHandler } = require("../_errors");
const { writeAssociation, updateAssociation } = require("./associations");

function checkIfFound(model, id, Model) {
  if (model === null || model === undefined) {
    throw new RecordNotFoundError(
      `A record wasn't found in '${Model.getTableName()}' table with the primary key '${id}'`
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
  let options = buildOptions(include, __forceSelectFields);

  let model = await Model.findOne({ where: { id: id }, ...options });

  checkIfFound(model, id, Model);

  return model;
}

module.exports = {
  one: (Model, { include = [], __forceSelectFields = [] } = {}) => {
    return async (_, { id }) => {
      let model = await findOne(Model, id, include, __forceSelectFields);
      return model;
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

  create: (
    Model,
    {
      fromObject,
      withParent,
      toChild,
      include = [],
      transformer = (v) => v,
      __forceSelectFields = [],
    } = {}
  ) => {
    return async (_, values) => {
      let model = await writeErrorHandler(async () => {
        let transformedValues = transformer(
          fromObject && !withParent ? values[fromObject] : values
        );
        if (withParent && toChild) {
          return await writeAssociation(toChild, withParent, transformedValues);
        }
        return await Model.create(transformedValues);
      });

      if (include.length > 0 || __forceSelectFields.length > 0) {
        return await findOne(Model, model.id, include, __forceSelectFields);
      }

      return model;
    };
  },

  update: (
    Model,
    {
      fromObject,
      withParent,
      toChild,
      include = [],
      transformer = (v) => v,
      __forceSelectFields = [],
    } = {}
  ) => {
    return async (_, { id, ...values }) => {
      let model = await writeErrorHandler(async () => {
        let transformedValues = transformer(
          fromObject && !withParent ? values[fromObject] : values
        );
        if (withParent && toChild) {
          return await updateAssociation(
            toChild,
            withParent,
            transformedValues
          );
        }
        return await Model.update(transformedValues, {
          where: { id: id },
          returning: true,
        });
      });

      if (model instanceof Array) {
        model = model[1][0];
      }

      checkIfFound(model, id, Model);

      if (
        (include && include.length > 0) ||
        (__forceSelectFields && __forceSelectFields.length > 0)
      ) {
        return await findOne(
          Model,
          id ? id : model.id,
          include,
          __forceSelectFields
        );
      }
      return model;
    };
  },

  destroy: (Model) => {
    return async (_, { id }) => {
      let model = await findOne(Model, id);
      await model.destroy();
      return model;
    };
  },
};
