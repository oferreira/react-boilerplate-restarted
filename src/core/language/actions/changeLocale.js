import {
  CHANGE_LOCALE,
} from 'core/language/constants'

/**
 * Request informations of a menu
 *
 * @param  {id} id of menu
 *
 * @return {object}   An action object with a type of CHANGE_LOCALE
 */
export default function changeLocale(locale) {
  return {
    type: CHANGE_LOCALE,
    locale,
  }
}
