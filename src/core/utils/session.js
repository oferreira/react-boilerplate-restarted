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
  set: (cname, data, ttl) => {
    const d = new Date()
    d.setTime(d.getTime() + (ttl * 1000))
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
  get: (forceCookie) => {
    if (!forceCookie && window.localStorage !== 'undefined') {
      return Localstorage
    }
    return CookieStorage
  },
}

export const Session = {
  store: null,
  getStore: (forceCookie) => {
    if (Session.store) {
      return Session.store
    }
    Session.store = Store.get(forceCookie)
    return Session.store
  },
  /**
   * Set in the appropriate storage the data passed in parameters
   * @param {object|string} data
   * @param {string} name
   * @param {number} ttl in microtime
   */
  set: (name = SESSION_KEY, data, ttl = 1000 * 3600 * 24 * 7, forceCookie = false) => {
    Session.getStore(forceCookie).set(name, data, ttl)
  },
  /**
   * Retrieve data in the storage using a key identifier
   * @param {string} name
   */
  get: (name = SESSION_KEY, forceCookie = false) => (Session.getStore(forceCookie).get(name)),
}
