import {
  module,
  test
} from 'qunit';
import {
  visit,
  currentURL
} from '@ember/test-helpers';
import {
  setupApplicationTest
} from 'ember-qunit';
import {
  authenticateSession
} from 'ember-simple-auth/test-support';
import {
  Role
} from 'clubhouse/constants/roles';

module('Acceptance | auditor', function (hooks) {
  setupApplicationTest(hooks);


  hooks.beforeEach(function () {
    this.person = server.create('person', {
      status: 'auditor',
      roles: [Role.LOGIN]
    });
    authenticateSession({
      person_id: this.person.id
    });
  });

  test('Auditor sidebar view', async function (assert) {
    await visit('/me');
    assert.equal(currentURL(), '/me');

    const links = [
      ['/me/schedule', true, 'Schedule'],
      ['/me/timesheet', false, 'Timesheet'],
      ['/me/event-info', false, 'Event Info'],
      ['/me/tickets', false, 'Tickets and Stuff'],
      ['/me/motorpool-policy', false, 'Motorpool Policy'],
      ['/me/messages', false, 'Messages'],
      ['/me/alerts', true, 'Alerts'],
      ['/me/contact', false, 'Ranger Contact'],
      ['/me/personal-info', true, 'Personal Info'],
      ['/me/emergency-contact', false, 'Emergency Contact'],
      ['/me/password', true, 'Change Password'],
    ];

    links.forEach((link) => {
      const dom = assert.dom(`#sidebar-container a[href="${link[0]}"]`);
      if (link[1]) {
        dom.exists(`${link[2]} sidebar link exists`);
      } else {
        dom.doesNotExist(`${link[2]} sidebar link does not exist`);
      }
    });
  });

  test('Auditor home page', async function (assert) {
    await visit('/me');

    const links = [
      ['/me/schedule', true, 'Schedule'],
      ['/me/timesheet', false, 'Timesheet'],
      ['/me/tickets', false, 'Tickets and Stuff'],
      ['/me/motorpool-policy', false, 'Motorpool Policy'],
      ['/me/personal-info', true, 'Personal Info'],
    ];

    links.forEach((link) => {
      const dom = assert.dom(`main a[href="${link[0]}"]`);
      if (link[1]) {
        dom.exists(`${link[2]} overview link exists`);
      } else {
        dom.doesNotExist(`${link[2]} overview link does not exist`);
      }
    });
  });

  test('Auditor see the schedule page', async function (assert) {
    const signedup = server.create('schedule', { person_assigned: true }); // eslint-disable-line no-unused-vars
    const available = server.create('schedule', { person_assigned: false }); // eslint-disable-line no-unused-vars

    await visit('/me/schedule');

    assert.dom('.schedule-itinerary').exists();
    assert.dom('.schedule-signup-sheet').exists({count: 2});
  });

  test('Auditor should be able to visit the Personal Info page', async function(assert) {
    await visit('/me/personal-info');
    assert.equal(currentURL(), '/me/personal-info');
  });

  test('Auditor should not be able to visit the Emergency Contact page', async function(assert) {
    await visit('/me/emergency-contact');
    // should bounce back to overview.
    assert.equal(currentURL(), '/me');
  });

  test('Auditor should not be able to visit the Tickets & Stuff page', async function(assert) {
    await visit('/me/tickets');
    // should bounce back to overview.
    assert.equal(currentURL(), '/me');
  });

  test('Auditor should be able to visit the Event Info page', async function(assert) {
    await visit('/me/event-info');
    assert.equal(currentURL(), '/me/event-info');
  });

  test('Auditor should not be able to visit the Contact Ranger page', async function(assert) {
    await visit('/me/contact');
    assert.equal(currentURL(), '/me');
  });
});
