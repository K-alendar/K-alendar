const crud = require("./crud");
const { makeAssociation, writeAssociation } = require("./associations");

class Association {
  constructor(associationName, { as, autoCreate } = { autoCreate: false }) {
    this.associationName = associationName;
    this.as = as;
    this.autoCreate = autoCreate;
  }
}

class ParentAssociation extends Association {
  constructor(associationName, { as, autoCreate } = { autoCreate: false }) {
    super(associationName, { as: as, autoCreate: autoCreate });
  }
}

class ChildAssociation extends Association {
  constructor(associationName, { as, autoCreate } = { autoCreate: false }) {
    super(associationName, { as: as, autoCreate: autoCreate });
  }
}

class ResolverFactory {
  constructor(
    Model,
    {
      include = [],
      transformer = v => v,
      fromObject,
      __forceSelectFields = [],
      associations = []
    }
  ) {
    this.Model = Model;
    this.transformer = transformer;
    this.include = include;
    this.fromObject = fromObject;
    this.__forceSelectFields = __forceSelectFields;
    this.rawAssociations = associations;
  }

  create() {
    return async (_, values) => {
      let model = await crud.create(this.Model, {
        include: this.include,
        transformer: this.transformer,
        fromObject: this.fromObject,
        __forceSelectFields: this.__forceSelectFields
      })(_, values);

      for (let association of this.rawAssociations) {
        if (association instanceof ChildAssociation && association.autoCreate) {
          model[
            association.as ? association.as : association.associationName
          ] = await writeAssociation(
            association.associationName,
            model,
            values[association.associationName]
              ? values[association.associationName]
              : {}
          );
        }
      }

      return model;
    };
  }

  update() {
    return async (_, values) => {
      let model = await crud.update(this.Model, {
        include: this.include,
        transformer: this.transformer,
        fromObject: this.fromObject,
        __forceSelectFields: this.__forceSelectFields
      })(_, values);

      for (let association of this.rawAssociations) {
        if (association instanceof ChildAssociation && association.autoCreate) {
          model[
            association.as ? association.as : association.associationName
          ] = await writeAssociation(
            association.associationName,
            model,
            values[association.associationName]
              ? values[association.associationName]
              : {}
          );
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
      return { ...acc, ...makeAssociation(val.associationName, val.as) };
    }, {});
  }
}

module.exports = {
  ResolverFactory: ResolverFactory,
  Association: Association,
  ParentAssociation: ParentAssociation,
  ChildAssociation: ChildAssociation
};
