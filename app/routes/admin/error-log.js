import Route from '@ember/routing/route';

export default class AdminErrorLogRoute extends Route {
  queryParams = {
    person_id: { refreshModel: true },
    sort: { refreshModel: true },
    starts_at: { refreshModel: true },
    ends_at: { refreshModel: true },
    component: { refreshModel: true },
    page: { refreshModel: true },
    page_size: { refreshModel: true }
  };

  model(params) {
    return this.ajax.request('error-log', {
      data: params
    });
  }

  setupController(controller, model) {
    controller.setProperties(model);
  }
}