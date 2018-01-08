/**
 * Construct action generic of success
 *
 * @param  {type} type of request
 * @param  {payload} informations returned by service
 * @param  {id} unique key
 *
 * @return {object} An action objects
 */

export default function requestLoaded(type, payload, id = undefined) {
  return {
    type,
    payload,
    id,
  }
}
