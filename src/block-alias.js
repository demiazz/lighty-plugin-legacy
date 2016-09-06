/* eslint no-param-reassign: 0 */

import $ from 'jquery';


export default function addBlockAlias(component, node) {
  component.block = $(node);
}
