var Schema = {
  Pis: {
    id: {
      type: 'increments',
      nullable: false,
      primary: true
    },
    idpi: {
      type: 'text',
      maxlength: 50,
      nullable: false
    }
  }

};

module.exports = Schema;
