import Component from '@ember/component';
import EmberObject from '@ember/object';
import { action, computed } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';
import { optional } from '@ember-decorators/argument/types';
import { Role } from 'clubhouse/constants/roles';

export default class PersonRoleFormComponent extends Component {
  // role id array
  @argument(optional('object')) roleIds = null;
  // available roles to select from
  @argument('object') roles = null;
  @argument('object') onSave = null;
  @argument('object') onCancel = null;

  didReceiveAttrs() {
    this.set('roleForm', EmberObject.create({ roleIds: this.roleIds }))
  }

  // Create a list of roles options to check
  @computed('roles')
  get roleOptions() {
      if (!this.roles) {
        return [];
      }

      return this.roles.map((role) => {
        return [ role.title, role.id ];
      });
  }

  @action
  save(model, isValid) {
    const originalIds = this.roleIds;
    const updatedIds = model.get('roleIds');
    const wantAdmin = (!originalIds.includes(Role.ADMIN) && updatedIds.includes(Role.ADMIN));
    const wantPII = (!originalIds.includes(Role.VIEW_PII) && updatedIds.includes(Role.VIEW_PII));

    if (wantAdmin || wantPII) {
      let abilities;
      const roles = [];

      if (wantAdmin) {
        abilities = 'have full administrator privileges including being able to view and modify sensitive information';
        roles.push('Admin');
      } else if (wantPII) {
        abilities = 'be able to view sensitive information';
      }

      if (wantPII) {
        roles.push('View Personal Info');
      }

      this.modal.confirm('Confirmation Required',
        `WARNING: The ${roles.join(' and ')} role${roles.length > 1 ? 's':''} requires prior approval by the Ranger Council. This person will ${abilities}. Are you absolutely 100% sure you want to do this?`,
        () => {
          this.onSave(model, isValid);
        }
      );
    } else {
      this.onSave(model, isValid);
    }
  }

  @action
  cancel(model) {
    this.onCancel(model);
  }
}
