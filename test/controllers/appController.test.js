const expect = require('chai').expect;
const AppController = require('../../src/controllers/appController');

describe('AppController', () => {
  it('should exist and have defined methods', () => {
    expect(AppController).to.exist;
    expect(AppController).to.have.property('index');
    expect(AppController).to.have.property('status');
  });
});
