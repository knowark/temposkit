export function mockFetch(response, ok=true) {
  return function fetch(_url, _options) {
    return new Promise((resolve) => {
      resolve({
        json: async () => ({ response }),
        ok: ok
      })
    })
  }
}
