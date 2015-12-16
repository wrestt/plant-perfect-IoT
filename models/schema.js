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
      type: 'timestamp default current_timestamp'
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
      type: 'timestamp default current_timestamp'
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
  },

  soil: {
    id: {
      type: 'increments',
      nullable: false,
      primary: true
    },
    date: {
      type: 'timestamp default current_timestamp'
    },
    idpi: {
      type: 'text',
      maxlength: 50,
      nullable: false
    },
    soilhumidity: {
      type: 'numeric',
      nullable: false,
      unsigned: true
    }
  },

  water: {
    id: {
      type: 'increments',
      nullable: false,
      primary: true
    },
    date: {
      type: 'timestamp default current_timestamp'
    },
    idpi: {
      type: 'text',
      maxlength: 50,
      nullable: false
    },
    present: {
      type: 'numeric',
      nullable: false,
      unsigned: true
    },
    watering: {
      type: 'numeric',
      nullable: false,
      unsigned: true
    }
  }

};

module.exports = Schema;
