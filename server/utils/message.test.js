const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'user';
        const lat = 1;
        const lon = 2;
        const url = `https://www.google.com/maps?q=${lat},${lon}`;

        const res = generateLocationMessage(from, lat, lon);

        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({from, url});
        expect(res.url).toBe(url);
    });
});