const validate = require("validate.js");

const crud = require("./crud");
const {
  createReadAssociation,
  writeAssociation,
  updateAssociation
} = require("./associations");
const defaults = require("../_defaults.js");
const { ValidationError } = require("../_errors");

class Association {
  constructor(
    associationName,
    factory,
    { as, autoCreate } = { autoCreate: false }
  ) {
    this.associationName = associationName;
    this.as = as ? as : associationName;
    this.autoCreate = autoCreate;
    this.factory = factory;
  }
}

class ParentAssociation extends Association {
  constructor(
    associationName,
    factory,
    { as, autoCreate } = { autoCreate: false }
  ) {
    super(associationName, factory, { as: as, autoCreate: autoCreate });
  }
}

class ChildAssociation extends Association {
  constructor(
    associationName,
    factory,
    { as, autoCreate } = { autoCreate: false }
  ) {
    super(associationName, factory, { as: as, autoCreate: autoCreate });
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

  makeValidations() {
    return values => {
      let errors = validate(values, this.validations);
      if (!errors) {
        return;
      }
      throw new ValidationError(errors);
    };
  }

  create({ withParent, toChild } = {}) {
    return async (_, values) => {
      let model = await crud.create(this.Model, {
        include: this.include,
        transformer: this.transformer,
        fromObject: this.fromObject,
        __forceSelectFields: this.__forceSelectFields,
        validate: this.makeValidations(),
        withParent: withParent,
        toChild: toChild
      })(_, this.loadValuesWithDefaults(values));

      for (let association of this.rawAssociations) {
        if (
          association instanceof ChildAssociation &&
          association.autoCreate &&
          association.factory
        ) {
          model[association.as] = await association.factory.create({
            withParent: model,
            toChild: association.associationName
          })(
            _,
            this.loadValuesWithDefaults(
              values[association.associationName],
              association.associationName
            )
          );
        }
      }

      return model;
    };
  }

  update({ withParent, toChild } = {}) {
    return async (_, values) => {
      let model = await crud.update(this.Model, {
        include: this.include,
        transformer: this.transformer,
        fromObject: this.fromObject,
        __forceSelectFields: this.__forceSelectFields,
        validate: this.makeValidations(),
        withParent: withParent,
        toChild: toChild
      })(_, values);

      for (let association of this.rawAssociations) {
        if (
          association instanceof ChildAssociation &&
          association.autoCreate &&
          values[association.associationName] &&
          association.factory
        ) {
          let updatedAssociation = await association.factory.update({
            withParent: model,
            toChild: association.associationName
          })(_, values[association.associationName]);

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
      return { ...acc, ...createReadAssociation(val.associationName, val.as) };
    }, {});
  }
}

module.exports = {
  ResolverFactory: ResolverFactory,
  Association: Association,
  ParentAssociation: ParentAssociation,
  ChildAssociation: ChildAssociation
};
