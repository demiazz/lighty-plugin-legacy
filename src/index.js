import $ from 'jquery';
import { plugin } from 'lighty';

import roles from './roles';
import events from './events';
import querySelector from './query-selector';


function pluginInitializer() {
  return function transform(component, node) {
    component.block = $(node);

    component.$ = function findInBlock(selector) {
      return $(selector, component.block);
    };

    roles(component);
    events(component);
  };
}


export { querySelector };

export default plugin('legacy', pluginInitializer);
