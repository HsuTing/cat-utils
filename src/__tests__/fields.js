'use strict';

import Fields from './../fields';

const fields = new Fields();

describe('fields', () => {
  it('# addType', () => {
    expect(fields.types).toMatchObject({});

    fields.addType('test', {
      rules: []
    });

    expect(fields.types).toMatchObject({
      test: {
        rules: []
      }
    });

    expect(() => {
      fields.addType('test', {
        rules: []
      });
    }).toThrow('TYPE: test does exist.');
  });

  it('# getFields', () => {
    expect(fields.getFields()).toMatchObject([]);

    expect(fields.getFields([{
      type: 'test'
    }, {
      type: 'test',
      required: true
    }])).toMatchObject([{
      rules: []
    }, {
      rules: ['isEmpty']
    }]);

    expect(() => {
      fields.getFields([{
        type: 'type_not_exist'
      }]);
    }).toThrow('TYPE: type_not_exist does not exist.');
  });
});
