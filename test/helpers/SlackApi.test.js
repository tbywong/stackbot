const expect = require('chai').expect;
const SlackApi = require('../../lib/helpers/SlackApi');

describe('Helper: SlackApi', () => {
  it('shoud exist and have defined methods', () => {
    expect(SlackApi).to.exist;
    expect(SlackApi).to.have.property('call');
  });
});
