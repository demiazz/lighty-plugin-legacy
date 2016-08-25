/* eslint no-param-reassign: 0 */

import $ from 'jquery';
import { plugin } from 'lighty';


function pluginInitializer() {
  return function transform(component, node) {
    component.block = $(node);

    component.$ = function find(selector) {
      return $(node).find(selector);
    };
  };
}


export default plugin('legacy', pluginInitializer);
