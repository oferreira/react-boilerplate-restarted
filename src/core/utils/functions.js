/**
 * Session storage
 *
 * This object simply manage token stored in localstorage.
 */

const SESSION_KEY = 'GT/session'

const CookieStorage = {
  get: (cname = SESSION_KEY) => {
    const name = `${cname}=`
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  },
  set: (data, cname, ttl) => {
    const d = new Date()
    d.setTime(d.getTime() + (ttl))
    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${cname}=${data};${expires};path=/`
  },
}

/*
 * Abstract Storage for localStorage
 */
const Localstorage = {
  token: null,
  set: (name = SESSION_KEY, token, ttl) => {
    window.localStorage.setItem(name, JSON.stringify({
      token,
      ttl: ttl + (new Date()).getTime(),
    }))
  },
  get: (name = SESSION_KEY) => {
    const result = []
    const oldToken = Localstorage.token
    if (oldToken && oldToken.ttl - (new Date()).getTime()) {
      return oldToken
    }
    const data = JSON.parse(window.localStorage.getItem(name))

    if (!data) {
      return result
    }
    const { token, ttl } = data

    if (token && ttl - (new Date()).getTime()) {
      localStorage.token = token
      return token
    }
    window.localStorage.removeItem(name)
    return result
  },
}

/*
 * Abstract Storage
 */
const Store = {
  get: () => {
    if (window.localStorage !== 'undefined') {
      return Localstorage
    }
    return CookieStorage
  },
}

export const Session = {
  store: null,
  getStore: () => {
    if (Session.store) {
      return Session.store
    }
    Session.store = Store.get()
    return Session.store
  },
  /**
   * Set in the appropriate storage the data passed in parameters
   * @param {object|string} data
   * @param {string} name
   * @param {number} ttl in microtime
   */
  set: (data, name = SESSION_KEY, ttl = 1000 * 3600 * 24 * 7) => {
    Session.getStore().set(data, name, ttl)
  },
  /**
   * Retrieve data in the storage using a key identifier
   * @param {string} name
   */
  get: (name = SESSION_KEY) => (Session.getStore().get(name)),
}

/**
*   @constructor
*   @param {string} url
*   @param {string|object|undefined} queries
*/
export class URLQueryBuilder {
  constructor(url, queries) {
    this.url = URLQueryBuilder.getClearUrl(url)
    this.queries = Object.assign(
      URLQueryBuilder.parseQueriesFromUrl(url),
      URLQueryBuilder.parseQueries(queries)
    )
  }

  getPath(base) {
    const { queries } = this
    let queriesStr = ''
    // eslint-disable-next-line
    for (const prop in queries) {
      const value = queries[prop]
      if (
        value !== undefined ||
        value !== null
      ) {
        queriesStr += `${prop}=${value}&`
      }
    }

    // delete last unnessesary &
    queriesStr = queriesStr.slice(0, -1)
    return `${base || ''}?${queriesStr}`
  }

  /**
   *  Get a current url with queries
   */
  getUrl() {
    return (`${this.url}?${this.getPath()}`).replace('??', '?')
  }

  /**
   *  Get clear url without queries
   */
  getClearUrl() {
    return this.url
  }

  /**
   *  Delete query by name
   *  @param {string} name, query that will be deleted
   *  @param {bool} contains, Remove all keys which contains the name
   */
  delete(name, contains = false) {
    if (contains) {
      // Remove keys containing name
      Object.keys(this.queries).map((q) => q.includes(name) ? this.delete(q) : null)
    } else {
      // Remove key with the name
      delete this.queries[name]
    }

    return this
  }

  /**
   *  Change query by name
   *  @param {string} name, query what will be changed
   *  @param {string|number} value, new value for query
   */
  change(name, value) {
    this.queries[name] = value

    return this
  }

  /**
   *  Add new query
   *  @param {string} name, name of new query
   *  @param {string|number} value, value for new query
   */
  add(name = {}, value) {
    if (typeof name === 'string') {
      if (Array.isArray(value)) { // Array value
        this.delete(name, true)
        value.map((v, index) => this.add(`${name}[${index}]`, v))
      } else if (typeof value === 'object') { // Object value
        if (value) { // typeof null = 'object', so we have to check this
          Object.keys(value).map((k) => this.add(`${name}[${k}]`, value[k]))
        } else {
          this.delete(name)
        }
      } else { // String value
        this.queries[name] = value
      }
    } else if (typeof name === 'object' && name != null) {
      const queries = name
      // eslint-disable-next-line
      for (const i in queries) {
        this.add(i, queries[i])
      }
    } else {
      throw new Error('Param name must be a string or an object')
    }

    return this
  }

  /**
   *  Clear query string
   *  @param {string|object} queries
   */
  reset(queries) {
    this.queries = URLQueryBuilder.parseQueries(queries)

    return this
  }

  /**
   *  Check if queries has specific query
   *  @return {boolean} true if has, false if not
   */
  has(name) {
    return (name in this.queries)
  }
}

/**
 *  get a clear url without query
 *  @param {string} url
 *  @return {string} url without query string
*/
URLQueryBuilder.getClearUrl = (url) => {
  let clearedUrl = ''

  if (typeof url === 'string') {
    [clearedUrl] = url.split('?')
  }

  return clearedUrl
}

/**
 * Parse queries from inital url string
 * @param {string} url
 */
URLQueryBuilder.parseQueriesFromUrl = (url) => {
  let queries = {}

  if (typeof url === 'string') {
    [, queries] = url.split('?')
    queries = URLQueryBuilder.parseQueries(queries)
  }

  return queries
}

/**
*   Parse queries
*   @param {Object|string} queries
*   @return {Object} parsed queries
*/
URLQueryBuilder.parseQueries = (queries = {}) => {
  let parsedQueries = {}
  const typeOfQueries = typeof queries
  if (typeOfQueries === 'string') {
    const queriesArray = queries.split('&')
    // eslint-disable-next-line
    for (let i = 0; i < queriesArray.length; i++) {
      const [prop, value] = queriesArray[i].split('=')
      parsedQueries[prop] = value
    }
  } else if (
    typeOfQueries === 'object' &&
    queries != null
  ) {
    parsedQueries = queries
  }

  return parsedQueries
}

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
  return objReturn
}

export const getLocationQueriesObject = (query = {}) => {
  const newLocation = { ...query }
  newLocation.rooms = getQueriesObject(query, 'rooms').rooms
  return newLocation
}

/**
 * Permet de merger un retour d'api dans la liste d'hotel
 * @param {Array} hotels
 * @param {Array} whatList
 * @param {String} hotelkey
 * @param {String} whatkey
 */
export function mergeHotels(hotels, whatList, hotelkey, whatkey) {
  return hotels.map((hotel) => {
    const temp = hotel
    const needle = whatList ? whatList.find((item) => item.resortId === hotel.id) : null
    temp[hotelkey] = needle ? needle[whatkey] : null
    return temp
  })
}

/**
 * Get a deep value in an object based on the path parameters
 * @param {Object} obj A deep plain javascript object
 * @param {Array} path Path to reach in the object
 */
export function getObjectValue(obj, path_) {
  const path = Array.isArray(path_) ? path_ : [path_]
  if (!path || path.length === 0 || !obj) {
    return obj
  }
  if (path.length === 1) {
    return obj[path[0]]
  }
  return getObjectValue(obj[path[0]], path.slice(1))
}

/**
 * Return the item with the minimun value passed in parameters
 * @param {Array | Iterable} from
 * @param {Array} key
 * @return {Object}
 */
export function getMin(from, dkey) {
  const key = Array.isArray(dkey) ? dkey : [dkey]
  let min = 2e+16
  let item = null
  from.forEach((a) => {
    const toCheck = getObjectValue(a, key)
    if (toCheck < min) {
      min = toCheck
      item = getObjectValue(a, key.slice(0, -1))
    }
  })
  return item
}

/**
 * Return the item with the max value passed in parameters
 * @param {Array | Iterable} from
 * @param {Number} key
 */
export function getMax(from, dkey) {
  const key = Array.isArray(dkey) ? dkey : [dkey]
  let min = 0
  let item = null
  from.forEach((a) => {
    const toCheck = getObjectValue(a, key)
    if (toCheck >= min) {
      min = toCheck
      item = getObjectValue(a, key.slice(0, -1))
    }
  })
  return item
}

/**
 * Group an iterable object by a key
 */
export function groupBy(what, whatKey) {
  const grouped = {}
  what.forEach((a) => {
    if (!grouped[a[whatKey]]) {
      grouped[a[whatKey]] = []
    }
    grouped[a[whatKey]].push(a)
  })
  return grouped
}

/**
 * Create a pipeline of functions, passing the output of one function to the input of another
 * @param {varArgs} pure functions
 */
export const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x)

/**
* Call Promise as a method and return values
* @param {func} methodToCall Promise to call
* @param {object} input method params
*/
export function executePromise(methodToCall, input = {}) {
  const tmp = methodToCall({ ...input })
  return tmp.then((values) => (values)).catch((error) => ({ error }))
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { // eslint-disable-line
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); // eslint-disable-line
    return v.toString(16)
  })
}
