import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | hq/training-info', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:hq/training-info');
    assert.ok(route);
  });
});
