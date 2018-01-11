import queryString from 'query-string'

export const urlToObject = (url = '') => queryString.parse(url, { arrayFormat: 'index' })
export const objectToUrl = (obj = {}) => queryString.stringify(obj, { arrayFormat: 'index' })
