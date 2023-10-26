

const fetch = jest.fn();

fetch.mockResolvedValue({
  ok: true,
  json: () => Promise.resolve(/* Your mock response data here */),
});

module.exports = fetch;
