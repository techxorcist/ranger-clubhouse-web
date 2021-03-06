import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';
import { computed } from '@ember-decorators/object';

export default class TicketingClosedComponent extends Component {
  @argument('object') person;
  @argument('object') ticketingInfo;
  @argument('object') ticketPackage;

  @computed('ticketPackage.tickets')
  get ticket() {
    return this.ticketPackage.tickets.find((ticket) => ticket.selected);
  }

  @computed('ticketPackage.delivery')
  get delivery() {
    return this.ticketPackage.delivery;
  }

  @computed('ticketPackage.wap')
  get wap() {
    return this.ticketPackage.wap;
  }

  @computed('ticket.{status,type}')
  get usingStaffCredential() {
    const ticket = this.ticket;
    return (ticket && ticket.type == 'staff_credential' && (ticket.status == 'claimed' || ticket.status == 'submitted'));
  }

  @computed('ticketPackage.vehicle_pass')
  get usingVehiclePass() {
    const pass = this.ticketPackage.vehicle_pass;
    return (pass && (pass.status == 'claimed' || pass.status == 'submitted'));
  }

  @computed('ticketPackage.vehicle_pass')
  get usingWAP() {
    const wap = this.ticketPackage.wap;
    return (wap && (wap.status == 'claimed' || wap.status == 'submitted'));
  }

  @computed('person.status')
  get hasFullPackage() {
    return (!this.person.isAlpha && !this.person.isProspective);
  }

  @computed('ticketPackage.delivery.method')
  get usingMail() {
    const delivery = this.ticketPackage.delivery;

    return (delivery && delivery.method == 'mail');
  }

  @computed('ticketPackage.delivery.method')
  get usingWillCall() {
    const delivery = this.ticketPackage.delivery;

    return (delivery && delivery.method == 'will_call');
  }

  // Return a list of WAP SO names
  @computed('ticketPackage.wapso')
  get wapSOList() {
    return this.ticketPackage.wapso;
  }
}
