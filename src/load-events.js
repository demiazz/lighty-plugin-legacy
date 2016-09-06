/* eslint no-param-reassign: 0, no-continue: 0, prefer-rest-params: 0 */

import $ from 'jquery';


let loaded;

$(window).on('load', e => {
  loaded = e;
});

export default function addLoadEvents(component) {
  const property = 'load on window';
  const eventCallback = component[property];

  if (!eventCallback) {
    return;
  }

  if (loaded) {
    setTimeout(() => {
      eventCallback.call(component, loaded);
    }, 1);
  } else {
    $(window).load(e => {
      eventCallback.call(component, e);
    });
  }
}
