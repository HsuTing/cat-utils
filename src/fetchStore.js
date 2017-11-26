'use strict';

export default class FetchStore {
  constructor(data) {
    this.data = data;

    this.fetch = this.fetch.bind(this);
  }

  set add(data) {
    this.data = data;
  }

  fetch(link) {
    return (operation, variables, cacheConfig) => {
      if(this.data) {
        const {...output} = this.data;
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
      }).then(response => response.json());
    };
  }
}
