import Component from '@ember/component';
import { action, computed } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';
import { optional } from '@ember-decorators/argument/types';
import PositionValidations from 'clubhouse/validations/position';
import PositionTypes from 'clubhouse/constants/position-types';

export default class PositionFormComponent extends Component {
  @argument('object') position;
  @argument(optional('object')) trainingPositions;
  @argument('object') onSave;
  @argument('object') onCancel;

  positionTypes = PositionTypes;
  positionValidations = PositionValidations;

  @computed('position.isNew')
  get formTitle() {
    return this.position.isNew ? 'Create Position' : 'Edit Position';
  }

  @computed('trainingPositions')
  get trainingOptions() {
    const options = [
      ['-', '']
    ];

    const positions = this.trainingPositions;

    positions.forEach((position) => {
      options.pushObject([position.title, position.id]);
    })

    return options;
  }

  @action
  save(model, isValid) {
    this.onSave(model, isValid);
  }

  @action
  cancel(model) {
    this.onCancel(model);
  }
}
