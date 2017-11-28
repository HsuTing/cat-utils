'use strict';

export default class Fields {
  constructor(isEmpty) {
    this.isEmpty = isEmpty || 'isEmpty';
    this.types = {};

    this.defaultResolver = this.defaultResolver.bind(this);
  }

  addType(typeName, type) {
    if(this.types[typeName])
      throw new Error(`TYPE: ${typeName} does exist.`);

    this.types[typeName] = type;

    return this.types;
  }

  defaultResolver({rules, required, ...field}) {
    return {
      ...field,
      rules: rules.concat(
        required ? [this.isEmpty] : []
      )
    };
  }

  getFields(fields = [], resolver = this.defaultResolver) {
    return fields.map(({type, ...field}) => {
      if(!this.types[type])
        throw new Error(`TYPE: ${type} does not exist.`);

      return resolver({
        ...field,
        ...this.types[type]
      });
    });
  }
}
