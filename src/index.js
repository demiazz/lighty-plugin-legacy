import { plugin } from 'lighty';

import './roles';

import addAliases from './aliases';
import addEventListeners from './events';


function pluginInitializer() {
  return function transform(component, node) {
    addAliases(component, node);
    addEventListeners(component);
  };
}


export default plugin('legacy', pluginInitializer);
