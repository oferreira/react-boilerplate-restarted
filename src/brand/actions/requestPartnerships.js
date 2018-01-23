import {
  REQUEST_PARTNERSHIP,
} from 'brand/constants'

/**
 * Request Partnership
 *
 * @return {object}   An action object with a type of REQUEST_PARTNERSHIP
 */
export default function requestPartnership() {
  return {
    type: REQUEST_PARTNERSHIP,
  }
}
