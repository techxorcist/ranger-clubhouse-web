import { module, skip /* test */ } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ticket-vp-info', function(hooks) {
  setupRenderingTest(hooks);

  skip('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{ticket-vp-info}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#ticket-vp-info}}
        template block text
      {{/ticket-vp-info}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
