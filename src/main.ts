import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Controller from './js/controller';
import { $on } from './js/helper';
import Template from './js/template';
import Store from './js/store';
import View from './js/view';

const store = new Store('todos-vanilla-es6', () => {});

const template = new Template();
const view = new View(template);

/**
 * @type {Controller}
 */
const controller = new Controller(store, view);

const setView = () => controller.setView(document.location.hash);
$on(window, 'load', setView, () => {} );
$on(window, 'hashchange', setView, () => {});
