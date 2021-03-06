import Mixin from '@ember/object/mixin';
import {
  computed
} from '@ember/object';
import * as PersonStatus from 'clubhouse/constants/person_status';
import {
  Role,
  roleName
} from 'clubhouse/constants/roles';
import {
  typeOf, isEmpty
} from '@ember/utils';

export default Mixin.create({
  // Computed methods
  isActive: computed('status', function () {
    return (this.status == PersonStatus.ACTIVE);
  }),

  isAlpha: computed('status', function () {
    return (this.status == PersonStatus.ALPHA)
  }),

  isAuditor: computed('status', function () {
    return this.status == PersonStatus.AUDITOR;
  }),

  isSuspended: computed('status', function() {
    return this.status == PersonStatus.SUSPENDED;
  }),

  isNonRanger: computed('status', function () {
    return this.status == PersonStatus.NON_RANGER;
  }),

  isProspective: computed('status', function () {
    return this.status == PersonStatus.PROSPECTIVE;
  }),

  isPastProspective: computed('status', function () {
    return (this.status == PersonStatus.PAST_PROSPECTIVE);
  }),

  isProspectiveWaitlist: computed('status', function () {
    return (this.status == PersonStatus.PROSPECTIVE_WAITLIST);
  }),

  isAuditorOrPastProspective: computed('status', function () {
    return (status == PersonStatus.AUDITOR || status == PersonStatus.PAST_PROSPECTIVE);
  }),

  isNotRanger: computed('status', function () {
    const status = this.status;

    return (status == PersonStatus.AUDITOR ||
      status == PersonStatus.ALPHA ||
      status == PersonStatus.BONKED ||
      status == PersonStatus.PROSPECTIVE ||
      status == PersonStatus.PAST_PROSPECTIVE ||
      status == PersonStatus.PROSPECTIVE_WAITLIST);
  }),

  isRanger: computed('status', function () {
    return (!this.isNotRanger && this.status != 'non ranger');
  }),

  canSignupForShifts: computed('status', function () {
    return (!this.isNotARanger && this.status != PersonStatus.PAST_PROSPECTIVE);
  }),

  canStartShift: computed('status', function () {
    return !(
      this.status == "auditor" ||
      this.status == "deceased" ||
      this.status == "dismissed" ||
      this.status == "past prospective" ||
      this.status == "prospective" ||
      this.status == "uberbonked"
    );
  }),

  needsBpguid: computed('bpguid', function() {
    return (!this.isAuditor && !this.isNonRanger && isEmpty(this.bpguid));
  }),

  hasRole(roles) {
    let personRoles = this.roles;

    if (!personRoles) {
      return false;
    }

    if (typeOf(roles) != 'array') {
      roles = [roles];
    }

    let haveIt = false;

    roles.forEach((role) => {
      const type = typeOf(role);
      if (type == 'array' || type == 'object') {
        let haveAll = true;

        // Sub array means ALL the roles have to be present.
        role.forEach((r) => {
          if (!role) {
            throw new Error('hasRole: Unknown role - is the name spelled correctly?');
          }

          if (!personRoles.includes(r)) {
            haveAll = false;
          }
        });

        if (haveAll) {
          haveIt = true;
        }
      } else {
        if (!role) {
          throw new Error('hasRole: Unknown role - is the name spelled correctly?');
        }
        if (personRoles.includes(role)) {
          haveIt = true;
        }
      }
    })

    return haveIt;
  },

  hasAllRoles(roles) {
    let personRoles = this.roles;

    if (!personRoles) {
      return false;
    }

    if (typeOf(roles) != 'array') {
      roles = [roles];
    }

    const found = roles.filter((r) => personRoles.includes(r));

    return (found.length == roles.length);
  },

  roleNames: computed('roles', function () {
    let personRoles = this.roles;

    if (!personRoles) {
      return 'none';
    }

    let names = [];

    personRoles.forEach((role) => {
      names.push(roleName(role))
    });

    return names.join(',');
  }),

  // Roles
  isAdmin: computed('roles', function () {
    return this.hasRole(Role.ADMIN);
  }),

});
