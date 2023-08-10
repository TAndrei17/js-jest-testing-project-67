// fake Axios-client that accepts an object {}
// property - fake URL, value - HTML for testing the function

class AxiosFakeClient {
  constructor(response = {}) {
    this.response = response;
  }

  get(url) {
    if (this.response[url]) {
      return Promise.resolve({ data: this.response[url] });
    }
    return Promise.resolve(new Error('No mock response for this URL'));
  }
}

export default AxiosFakeClient;
