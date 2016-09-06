/* eslint no-param-reassign: 0, no-continue: 0, prefer-rest-params: 0 */

import $ from 'jquery';

import { endsWith } from './utils';


export default function addWindowEvents(component) {
  const properties = Object.keys(component);

  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];

    if (!endsWith(property, 'on window')) {
      continue;
    }

    const eventsNames = property.split(' on ')[0];
    const eventsCallback = component[property];

    delete component[property];

    (function bindWindowEvents(events, callback) {
      $(window).on(events, function handleEvent() {
        callback.apply(component, arguments);
      });
    }(eventsNames, eventsCallback));
  }
}
