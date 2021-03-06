import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ch-form/cancel', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('cancelAction', () => { });
    await render(hbs`{{ch-form/cancel cancelAction=cancelAction}}`);

    assert.dom(this.element).hasText('Cancel');
  });

  test('it accepts a label', async function(assert) {
    this.set('label', 'Give up!');
    this.set('cancelAction', () => { });
    await render(hbs`{{ch-form/cancel label=label cancelAction=cancelAction}}`);

    assert.dom(this.element).hasText('Give up!');
  });
});
