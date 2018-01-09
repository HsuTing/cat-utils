'use strict';

import Koa from 'koa';

import FetchStore from './../fetchStore';

const fetchStore = new FetchStore();
const app = new Koa();
let server = null;

app.use((ctx, next) => {
  ctx.body = {
    data: 'fetch'
  };

  return next();
});

describe('fetchStore', () => {
  beforeAll(() => {
    server = app.listen(8000);
  });

  it('# fetch', () => expect(
    fetchStore.fetch('http://localhost:8000/')({})
  ).resolves.toMatchObject({data: 'fetch'}));

  it('# add data', () => {
    fetchStore.add = {
      data: 'data'
    };

    expect(
      fetchStore.fetch('http://localhost:8000/')({})
    ).toMatchObject({data: 'data'});
  });

  afterAll(() => {
    server.close();
  });
});
