import {
  REQUEST_LANGUAGES,
} from 'core/language/constants'

/**
 * Request languages
 *
 * @return {object}   An action object with a type of REQUEST_LANGUAGES
 */
export default function requestLanguages() {
  return {
    type: REQUEST_LANGUAGES,
  }
}
