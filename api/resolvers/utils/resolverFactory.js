const validate = require("validate.js");
const moment = require("moment");
const crud = require("./crud");
const { createReadAssociation } = require("./associations");
const defaults = require("../_defaults.js");
const { ValidationError, handleError } = require("../_errors");

validate.extend(validate.validators.datetime, {
  parse: (value, options) => {
    let date = moment(new Date(value)).utc();
    if (date.isValid) {
      return date;
    }
    return value;
  },

  format: (value, options) => {
    var format = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
    return moment.utc(value).format(format);
  }
});

class Association {
  constructor(name, factory, { as, autoCreate } = { autoCreate: false }) {
    this.name = name;
    this.as = as ? as : name;
    this.autoCreate = autoCreate;
    this.factory = factory;
  }

  get shouldCreate() {
    if (this instanceof ChildAssociation && this.autoCreate && this.factory) {
      return true;
    }
    return false;
  }
}

class ParentAssociation extends Association {
  constructor(name, factory, { as, autoCreate } = { autoCreate: false }) {
    super(name, factory, { as: as, autoCreate: autoCreate });
  }
}

class ChildAssociation extends Association {
  constructor(name, factory, { as, autoCreate } = { autoCreate: false }) {
    super(name, factory, { as: as, autoCreate: autoCreate });
  }
}

class ResolverFactory {
  constructor(
    Model,
    {
      fromObject,
      include = [],
      transformer = v => v,
      associations = [],
      validations = {},
      __forceSelectFields = []
    }
  ) {
    this.Model = Model;
    this.transformer = transformer;
    this.include = include;
    this.fromObject = fromObject;
    this.__forceSelectFields = __forceSelectFields;
    this.rawAssociations = associations;
    this.validations = validations;
  }

  loadValuesWithDefaults(values, associationName = undefined) {
    let defaultsKey = associationName
      ? `${this.Model.name}__${associationName}`
      : this.Model.name;

    let defaultValues = defaults[defaultsKey];

    if (!values) {
      return {};
    } else if (!defaultValues) {
      return values;
    }
    return Object.assign(defaultValues(values), values);
  }

  runChildValidations(values) {
    let errors = {};
    for (let association of this.rawAssociations) {
      if (association.shouldCreate && values[association.name]) {
        let associationErrors =
          association.factory.validate(values, { from: association.name }) ||
          {};

        if (Object.keys(associationErrors).length !== 0) {
          errors[association.as] = associationErrors;
        }
      }
    }
    return errors;
  }

  validate(values, { from, action } = {}) {
    let fetchedValues = values[from ? from : this.fromObject]
    let validations = this.validations;

    // Only the validate the values that are being updated
    if (action === "update" && fetchedValues) {
      let valuesKeys = Object.keys(fetchedValues)

      validations = Object.keys(this.validations).reduce((acc, key) => {
        if (valuesKeys.includes(key)) {
          acc[key] = this.validations[key]
        }
        return acc
      }, {})
    }

    let errors =
      validate(fetchedValues, validations) || {};

    Object.assign(errors, this.runChildValidations(values));

    if (Object.keys(errors).length === 0) {
      return;
    }

    return errors;
  }

  create({ withParent, toChild } = {}) {
    return async (_, values) => {
      let errors = this.validate(values, { action: "create" });

      if (errors) {
        handleError(new ValidationError(errors));
      }

      let model = await crud.create(this.Model, {
        include: this.include,
        transformer: this.transformer,
        fromObject: this.fromObject,
        __forceSelectFields: this.__forceSelectFields,
        withParent: withParent,
        toChild: toChild
      })(_, this.loadValuesWithDefaults(values));

      for (let association of this.rawAssociations) {
        if (association.shouldCreate) {
          model[association.as] = await association.factory.create({
            withParent: model,
            toChild: association.name
          })(
            _,
            this.loadValuesWithDefaults(
              values[association.name],
              association.name
            )
          );
        }
      }

      return model;
    };
  }

  update({ withParent, toChild } = {}) {
    return async (_, values) => {
      let errors = this.validate(values, { action: "update" });

      if (errors) {
        handleError(new ValidationError(errors));
      }

      let model = await crud.update(this.Model, {
        include: this.include,
        transformer: this.transformer,
        fromObject: this.fromObject,
        __forceSelectFields: this.__forceSelectFields,
        withParent: withParent,
        toChild: toChild
      })(_, values);

      for (let association of this.rawAssociations) {
        if (association.shouldCreate && values[association.name]) {
          let updatedAssociation = await association.factory.update({
            withParent: model,
            toChild: association.name
          })(_, values[association.name]);

          if (updatedAssociation) {
            model[association.as] = updatedAssociation;
          }
        }
      }

      return model;
    };
  }

  destroy() {
    return crud.destroy(this.Model);
  }

  all() {
    return crud.all(this.Model, {
      include: this.include,
      __forceSelectFields: this.__forceSelectFields
    });
  }

  one() {
    return crud.one(this.Model, {
      include: this.include,
      __forceSelectFields: this.__forceSelectFields
    });
  }

  associations() {
    return this.rawAssociations.reduce((acc, val) => {
      if (!val instanceof Association) {
        return acc;
      }
      return { ...acc, ...createReadAssociation(val.name, val.as) };
    }, {});
  }
}

module.exports = {
  ResolverFactory: ResolverFactory,
  Association: Association,
  ParentAssociation: ParentAssociation,
  ChildAssociation: ChildAssociation
};
