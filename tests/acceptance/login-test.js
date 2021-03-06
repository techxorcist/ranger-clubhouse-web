import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import {
  authenticateSession,
  currentSession
} from 'ember-simple-auth/test-support';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting / redirect to /login', async function(assert) {
    // make sure / redirects to /login
    await visit('/');

    assert.equal(currentURL(), '/login');
  });

  test('successful login', async function(assert) {
    const person = server.create('person');

    await visit('/login');
    await fillIn('input[name="identification"]', person.email);
    await fillIn('input[name="password"]', person.password);
    await click('button.login-submit');
    assert.equal(currentURL(), '/me');
  });

  test('invalid login', async function(assert) {
    await visit('/login');
    await fillIn('input[name="identification"]', 'thevoid@example.com');
    await fillIn('input[name="password"]', 'ineedashower!');
    await click('button.login-submit');

    // Should stay on the login page
    assert.equal(currentURL(), '/login', 'stay on the login page');
    // And there should be a flash modal with login error
    assert.dom('.alert-danger', document).includesText('The email and/or password is incorrect');
  });

  test('successful logout', async function(assert) {
    const person = server.create('person');
    await authenticateSession({ person_id: person.id });
    await visit('/logout');
    assert.equal(currentSession().isAuthenticated, false);
  });

  test('person not authorized', async function(assert) {
    const person = server.create('person', { user_authorized: false});
    await visit('/login');
    await fillIn('input[name="identification"]', person.email);
    await fillIn('input[name="password"]', person.password);
    await click('button.login-submit');

    // Should stay on the login page
    assert.equal(currentURL(), '/login', 'stay on the login page');
    // And there should be a flash modal with login error
    assert.dom('.alert-danger', document).includesText('The account has been permanently disabled');
  });

  test('prevent space for being entered in email field', async function (assert) {
    const person = server.create('person', { user_authorized: false});
    await visit('/login');
    await fillIn('input[name="identification"]', person.email+' ');
    assert.dom('input[name="identification"]').hasValue(person.email);
  });
});
