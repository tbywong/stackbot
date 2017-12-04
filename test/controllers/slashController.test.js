const expect = require('chai').expect;
const SlashController = require('../../src/controllers/slashController');

describe('SlashController', () => {
  it('should exist and have defined methods', () => {
    expect(SlashController).to.exist;
    expect(SlashController).to.have.property('intro');
  });
});
