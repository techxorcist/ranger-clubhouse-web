// heavily based off
// http://jarrettmeyer.com/2016/03/28/an-ember-multiselect-checkbox

import EmberObject from '@ember/object';
import Component from '@ember/component';
import { action, computed } from '@ember-decorators/object';
import { tagName } from '@ember-decorators/component';
import { argument } from '@ember-decorators/argument';
import { optional } from '@ember-decorators/argument/types';

import { typeOf } from '@ember/utils';
import inGroups from 'clubhouse/utils/in-groups';

class MultiCheckboxField extends EmberObject {
}

@tagName('')
export default class ChFormCheckboxGroupComponent extends Component {
  // field name
  @argument(optional('string')) name;
  // initial value
  @argument(optional('any')) value = '';

  @argument(optional('any')) options = null;
  @argument(optional('number')) cols;
  @argument(optional('string')) _domId;

  // Callback for when the group updates (i.e., the user clicks on stuff)
  @argument(optional('object')) onUpdate;

  // Used purely to be notified when the model completely changes
  @argument('object') model;

  gridColumn = 'col-auto';

  init() {
    super.init(...arguments);

    if (!this.cols) {
      this.set('cols', 3);
    }
  }

  @computed('options', 'model')
  get checkboxColumns() {
    const options = this.options || [];
    let values = this.value;

    if (typeOf(values) != 'array') {
      values = [ values ];
    }

    if (options.length == 0) {
      return [];
    }

    const columns = inGroups(options, this.cols, true);

    let index = 0;
    const checkboxes = [];
    this.set('checkboxes', checkboxes);

    return columns.map((column) => {
      return column.map((opt) => {
        const type = typeOf(opt);
        let label, value;

        if (type == 'object' && opt.id) {
          label = opt.title
          value = opt.id
        // Simple [ 'label', value ]
        } else if (type == 'array') {
          label = opt[0];
          value = opt[1];
        } else {
          // Or just [  value ]
          label = value = opt;
        }
        const field =  MultiCheckboxField.create({
          label,
          value,
          _domId: `${this._domId}${index}`,
          isChecked: values.includes(value),
        });

        this.checkboxes.push(field);
        index++;
        return field;
      })
    });
  }

  @action
  onClick(field) {
    let values = [];

    field.toggleProperty('isChecked');

    this.checkboxes.forEach((checkbox) => {
      if (checkbox.isChecked) {
        values.push(checkbox.value)
      }
    })

    this.onUpdate(values);
  }
}
