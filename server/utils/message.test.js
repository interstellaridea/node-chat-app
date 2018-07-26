const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // store res in var
    const from = 'Mocha test';
    const text = 'my test';
    const res = generateMessage(from, text);

    // assert from match
    // assert text match
    expect(res).toInclude({from, text})
    // assert timeStamp is a number
    expect(res.createdAt).toBeA('number');
  });
});