'use strict';

import FetchStore from './../fetchStore';

const fetchStore = new FetchStore();

global.fetch = () => new Promise(resolve => {
  resolve({
    json: () => ({
      data: 'fetch'
    })
  });
});

describe('fetchStore', () => {
  it('# fetch', () => expect(
    fetchStore.fetch('http://localhost/')({})
  ).resolves.toMatchObject({data: 'fetch'}));

  it('# add data', () => {
    fetchStore.add = {
      data: 'data'
    };

    expect(
      fetchStore.fetch('http://localhost/')({})
    ).toMatchObject({data: 'data'});
  });
});
