const slug = require('slug')

/**
 * Format strings into kebab case but also
 * handles `errorMessage` → `error-message`
 *
 * @param {string} string - String to format
 * @returns {string} Kebab case string
 */
exports.kebabCase = function (string) {
  return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Format strings into URL friendly "slug"
 *
 * @param {string} string - String to format
 * @returns {string} URL friendly "slug"
 */
exports.slugify = function (string) {
  return slug(string, { lower: true })
}