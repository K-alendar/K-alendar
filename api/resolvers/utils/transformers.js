const moment = require('moment')

module.exports = {
  parseDate: key => {
    return values => {
      let convertedDate = {};
      convertedDate[key] = values[key];
      if (convertedDate[key] && typeof convertedDate[key] === 'string') {
        convertedDate[key] = moment(
          convertedDate[key]
        ).unix();
      }
      return { ...values, ...convertedDate };
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
