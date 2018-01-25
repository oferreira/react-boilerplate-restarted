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
 *  Get the sum of array values
 * @param {Array} array
 */
export const getSum = (array) => {
  let total = 0
  array.map((f) => (
    total += parseInt(Object.values(f).reduce((a, b) => (
      (Number.isNaN(a) ? 0 : parseInt(a, 10)) + (Number.isNaN(b) ? 0 : parseInt(b, 10)) // Sum of values
    ), 1), 10) // Parse the value and add it to the total
  ))
  return total
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
export const executePromise = (methodToCall, input = {}) => {
  const tmp = methodToCall({ ...input })
  return tmp.then((values) => (values)).catch((error) => ({ error }))
}

/**
 * Get a v4 uuid
 */
export const uuidv4 = () => (
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8) // eslint-disable-line
    return v.toString(16)
  })
)

