var Schema = {
  pis: {
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
  },

  lights: {
    id: {
      type: 'increments',
      nullable: false,
      primary: true
    },
    date: {
      type: 'dateTime',
      defualt: current_timestamp
    },
    idpi: {
      type: 'text',
      maxlength: 50,
      nullable: false
    },
    ir: {
      type: 'numeric',
      nullable: false,
      unsigned: true
    },
    lux: {
      type: 'numeric',
      nullable: false,
      unsigned: true
    },
    visible: {
      type: 'numeric',
      nullable: false,
      unsigned: true
    }
  },

  air: {
    id: {
      type: 'increments',
      nullable: false,
      primary: true
    },
    date: {
      type: 'dateTime',
      defualt: current_timestamp
    },
    idpi: {
      type: 'text',
      maxlength: 50,
      nullable: false
    },
    airtemp: {
      type: 'numeric',
      nullable: false,
      unsigned: true
    },
    air: {
      type: 'numeric',
      nullable: false,
      unsigned: true
    }
  }

};


module.exports = Schema;
