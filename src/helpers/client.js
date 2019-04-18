let fetch;
if (typeof window !== 'undefined' && window.fetch) {
  ({ fetch } = window);
} else {
  fetch = require('cross-fetch'); // eslint-disable-line global-require
}

class Client {
  constructor(address, defaultOptions = {}) {
    if (typeof address !== 'string') throw new Error('InvalidArgument: address has to ba a string');
    if (typeof defaultOptions !== 'object')
      throw new Error('InvalidArgument: defaultOptions has to be an object');

    this.address = address;

    this.options = {
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' },
      ...defaultOptions,
    };

    this.fetchURL = this.fetchURL.bind(this);
  }

  fetchURL(request, options) {
    return fetch(this.address, {
      body: JSON.stringify(request),
      headers: options.headers,
      method: 'post',
      mode: 'cors',
    });
  }

}

export default Client;