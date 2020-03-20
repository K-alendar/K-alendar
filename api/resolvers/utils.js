module.exports = {
  createAndReturn: (Model, include = [], pk = "id") => {
    return async (_, values) => {
      let model = await Model.create(values);

      let cModel;

        if (include.length > 0) {
          cModel = await Model.findByPk(model[pk], {
            include: include
          });
        } else {
          cModel = await Model.findByPk(model[pk]);
        }

      return cModel;
    };
  }
};
