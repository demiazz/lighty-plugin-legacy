import $ from 'jquery';
import { plugin } from 'lighty';


function pluginInitializer() {
  return function transform(component, node) {
    component.block = $(node); // eslint-disable-line
  };
}


export default plugin('legacy', pluginInitializer);
