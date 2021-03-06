# Clubhouse 2.0 - A Single Page Application (SPA) frontend

[![Travis CI](https://travis-ci.com/burningmantech/ranger-clubhouse-web.svg?branch=master)](https://travis-ci.com/burningmantech/ranger-clubhouse-web)

This README outlines the details of collaborating on this Ember application.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Yarn](https://yarnpkg.org/)
* [Ember CLI](https://ember-cli.com/)
* Google Chrome or Firefox is recommended since the Ember Inspector extension is supported for both browsers.
  Safari and Windows IE Edge are supported.
  Windows IE11 and lesser versions *are not* supported.
* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi?hl=en): useful for inspecting Ember Data objects, routes, URL names, etc.

## Installation

* `git clone https://github.com/burningmantech/ranger-clubhouse-web` this repository
* `cd ranger-clubhouse-web`
* `yarn install`
* Install the Clubhouse API server - see https://github.com/burningmantech/ranger-clubhouse-api/README.md for more information

## Running / Development

* Start the frontend : `ember serve`

* Make sure the API server is running, see ranger-clubhouse-api/README.md

* Visit the clubhouse app at [http://localhost:4200](http://localhost:4200).
Make sure the browser's javascript console is opened - you will be spending a lot
of time looking at that window during development.

* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).
(Tests are coming)

## Dual Clubhouse: Running with Classic and 2.0 together

By default in the development environment, Clubhouse 2.0 does not run in
a 'Dual Clubhouse' mode.

To enable this, two configuration needs to be edited:

* In Clubhouse 2.0, edit 'config/environment.js' and set 'dualClubhouse' to true.

* In Clubhouse Classic, edit 'local.config.php' and set 'DualClubhouse' to true.

* Start Clubhouse Classic on port 9000 `php -S localhost:9000 -t .`
(yes three servers are running at this point: the ember development server,
the api server, and Clubhouse Classic)

* Be sure to log out of Clubhouse 2.0 and then log in again to make sure a Classic
  Clubhouse cookie has been set.

## API Server Endpoint

The API endpoint is specified in app/config/environment.js

For the development environment this is http://localhost:8000/

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test` runs all tests once, launching and quitting a browser
* `ember test --filter=unit` runs all tests whose module declaration includes “unit”
* `ember test --server` runs tests when changes are made
* Visiting http://localhost:4200/tests in a browser will run tests (optionally filtered) when changes are made to any code or test

Ember uses [QUnit](https://api.qunitjs.com/) for tests.
[qunit-dom](http://qunit-dom.com/) is included in the testing framework to provide higher level assertions for QUnit.

ember-cli-custom-assertions](https://github.com/dockyard/ember-cli-custom-assertions) has been included by the Ranger Tech Team so custom assertions can be used.
Look at the [tests/assertions] directory to see what custom assertions are available.

### Linting

* `yarn run lint:js`
* `yarn run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

TODO

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
