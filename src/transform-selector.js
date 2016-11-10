/*
 * Regexps from jquery.role by Sasha Koss https://github.com/kossnocorp/role
 */
export default function transformSelector(selector) {
  return selector
    .replace(/@@([\w\u00c0-\uFFFF-]+)/g, '[data-block~="$1"]')
    .replace(/@([\w\u00c0-\uFFFF-]+)/g, '[data-role~="$1"]');
}
