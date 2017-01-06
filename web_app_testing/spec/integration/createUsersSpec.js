'use strict';

const integrationHelpers = require('../helpers/integration'),
  integrationContext = integrationHelpers.integrationContext,
  startIntegrationContext = integrationHelpers.startIntegrationContext,
  getUrl = integrationHelpers.getUrl,
  config = require('../../config/application');

describe('create users', () => {

  let context;

  beforeEach(() => {
    require('../../app');
    context = startIntegrationContext();
  });

  it('not save if email is invalid', (done) => {
    integrationContext('', {done: done}, (testContext, done) => {
      context
        .goto(getUrl('/users/new'))
        .type('[name=email]', 'email@invalid')
        .click('[type=submit]')
        .evaluate((selector) => {
          return document.querySelector(selector).innerText;
        }, '#email-error')
        .then((text) => {
          expect(text).toEqual('email.invalid');
          done();
        });
    });
  }, config.tests.caseTimeout);
  
});
