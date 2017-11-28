'use strict';

export default class Fields {
  constructor(isEmpty) {
    this.isEmpty = isEmpty || 'isEmpty';
    this.types = {};
  }

  addType(typeName, type) {
    if(this.types[typeName])
      throw new Error(`TYPE: ${typeName} does exist.`);

    this.types[typeName] = type;

    return this.types;
  }

  getFields(fields = []) {
    return (showRequired = false) => fields.map(({type, required, ...field}) => {
      if(!this.types[type])
        throw new Error(`TYPE: ${type} does not exist.`);

      const {rules, ...otherSetting} = this.types[type];

      return {
        ...field,
        ...otherSetting,
        ...(showRequired ? {
          required,
          rules
        } : {
          rules: rules.concat(
            required ? [this.isEmpty] : []
          )
        })
      };
    });
  }
}
