/* eslint no-param-reassign: 0 */

import $ from 'jquery';
import { plugin } from 'lighty';

import './roles';

import addFindAlias from './find-alias';
import addRoleAlias from './role-alias';


function pluginInitializer() {
  return function transform(component, node) {
    component.block = $(node);

    addFindAlias(component);
    addRoleAlias(component);
  };
}


export default plugin('legacy', pluginInitializer);
