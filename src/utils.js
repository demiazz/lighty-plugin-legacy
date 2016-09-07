function startsWithNative(string, substring) {
  return string.startsWith(substring);
}

function startsWithPolyfill(string, substring) {
  return string.substr(0, substring.length) === substring;
}

export const startsWith = String.prototype.startsWith
  ? startsWithNative
  : startsWithPolyfill;


function endsWithNative(string, substring) {
  return string.endsWith(substring);
}

function endsWithPolyfill(string, substring) {
  return string.substr(-substring.length) === substring;
}

export const endsWith = String.prototype.endsWith
  ? endsWithNative
  : endsWithPolyfill;


function includesNative(string, substring) {
  return string.includes(substring);
}

function includesPolyfill(string, substring) {
  return string.indexOf(substring) !== -1;
}

export const includes = String.prototype.includes
  ? includesNative
  : includesPolyfill;
