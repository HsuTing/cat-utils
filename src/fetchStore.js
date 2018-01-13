// @flow
'use strict';

import fetch from 'fetch-everywhere';

import type {
  OperationSelector,
  Variables,
  CacheConfig
} from 'relay-runtime';

type responseType = {
  json: Function
}

export default class FetchStore<object> {
  data: ?object

  constructor(data: ?object) {
    this.data = data;
  }

  set add(data: ?object) {
    this.data = data;
  }

  fetch = (
    link: string
  ): Function => (
    operation: OperationSelector,
    variables: Variables,
    cacheConfig: ?CacheConfig
  ): Promise<*> | ?object => {
    if(this.data) {
      const output: object = {...this.data};

      this.data = null;
      return output;
    }

    return fetch(link, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    }).then((
      response: responseType
    ) => response.json());
  }
}
