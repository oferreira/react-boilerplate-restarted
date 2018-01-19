import _ from 'lodash'

/**
 * Use to handle URIs
 * Exemples :
 *      new QueryBuilder({ param1: 'value1', param2: ['value2', 'value3'] }, 'path').getUrl() >> 'path?param1=value1&param2[0]=value2&param2[1]=value3'
 *      new QueryBuilder('param1=value1&param2[0]=value2&param2[1]=value3').getQuery() >> { param1: 'value1', param2: ['value2', 'value3'] }
 */

export const getQueriesObject = (dataQuery, value) => {
  const objReturn = { [value]: [] }
  // Loop on object keys and create deep object
  Object.keys(dataQuery).forEach((k) => {
    const matched = k.match(/(.*)\[(.*)]\[(.*)]/)
    // Check if the value matched is the value wanted
    if (matched && matched.length >= 3 && matched[0].includes(value) >= 0) {
      // Fill the object with value matched
      matched.shift()
      if (!objReturn[value][matched[1]]) {
        objReturn[value][matched[1]] = { [matched[2]]: dataQuery[k] }
      } else {
        objReturn[value][matched[1]][matched[2]] = dataQuery[k]
      }
    }
  })
  return objReturn[value]
}

/**
*   @constructor
*   @param {string} url
*   @param {string|object|undefined} queries
*/
export default class QueryBuilder {
  constructor(query = '', pathname = '') {
    this.pathname = pathname.replace(/\?$/gi, '')
    this.query = _.isString(query) ? QueryBuilder.parseQueryFromUrl(query) : { ...query }
  }

  getUrl() {
    const { query } = this
    let queriesStr = ''
    // eslint-disable-next-line
    for (const prop in query) {
      const value = query[prop]
      if (value /* && !_.isArray(value) */) {
        queriesStr += `${prop}=${value}&`
      }
    }

    // delete last unnessesary &
    queriesStr = queriesStr.slice(0, -1)
    return `${this.pathname}?${queriesStr}`
  }

  getQuery() {
    return {
      ...this.query,
      rooms: getQueriesObject(this.query, 'rooms'),
    }
  }

  getPathname() {
    return this.pathname
  }

  /**
   *  Delete query by name
   *  @param {string} name, query that will be deleted
   *  @param {bool} contains, Remove all keys which contains the name
   */
  delete(name, contains = false) {
    if (contains) {
      // Remove keys containing name
      Object.keys(this.query).map((q) => (
        _.includes(q, name) ? this.delete(q) : null
      ))
    } else {
      // Remove key with the name
      delete this.query[name]
    }

    return this
  }

  /**
   *  Change query by name
   *  @param {string} name, query what will be changed
   *  @param {string|number} value, new value for query
   */
  change(name, value) {
    this.query[name] = value
    return this
  }

  /**
   *  Add new query
   *  @param {string} name, name of new query
   *  @param {string|number} value, value for new query
   */
  add(name = {}, value) {
    if (typeof name === 'string') {
      if (_.isArray(value)) { // Array value
        this.delete(name, true)
        value.map((v, index) => this.add(`${name}[${index}]`, v))
      } else if (typeof value === 'object') { // Object value
        if (value) { // typeof null = 'object', so we have to check this
          Object.keys(value).map((k) => this.add(`${name}[${k}]`, value[k]))
        } else {
          this.delete(name)
        }
      } else { // String value
        this.query[name] = value
      }
    } else if (_.isPlainObject(name)) {
      const query = { ...name }
      // eslint-disable-next-line
      for (const i in query) {
        this.add(i, query[i])
      }
    } else {
      throw new Error('Param name must be a string or an object')
    }

    return this
  }

  /**
   *  Check if queries has specific query
   *  @return {boolean} true if has, false if not
   */
  has(name) {
    return (name in this.query)
  }
}

/**
 * Parse queries from inital url string
 * @param {string} url
 */
QueryBuilder.parseQueryFromUrl = (url) => {
  let queries = {}

  if (_.isString(url)) {
    [, queries] = url.split('?')
    queries = QueryBuilder.parseQueries(queries)
  }

  return queries
}

/**
*   Parse queries
*   @param {Object|string} queries
*   @return {Object} parsed queries
*/
QueryBuilder.parseQueries = (queries = {}) => {
  let parsedQueries = {}
  if (_.isString(queries)) {
    const queriesArray = queries.split('&')
    // eslint-disable-next-line
    for (let i = 0; i < queriesArray.length; i++) {
      const [prop, value] = queriesArray[i].split('=')
      parsedQueries[prop] = value
    }
  } else if (_.isPlainObject(queries)) {
    parsedQueries = queries
  }

  return parsedQueries
}
