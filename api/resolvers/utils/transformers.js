module.exports = {
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
      return persistentValues;
    };
  }
};
