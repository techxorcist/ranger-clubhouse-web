import Mixin from '@ember/object/mixin';

export default Mixin.create({
  setupController(controller) {
    this._super(...arguments);
    controller.set('person', this.modelFor('me'));
    controller.set('user', this.session.user);
  }
});
