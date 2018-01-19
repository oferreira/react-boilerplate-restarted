import {
  CHANGE_LOCALE,
} from 'core/language/constants'

/**
 * Request informations of a language
 *
 * @param  {locale} locale of language
 *
 * @return {object}   An action object with a type of CHANGE_LOCALE
 */
export default function changeLocale(locale) {
  return {
    type: CHANGE_LOCALE,
    locale,
  }
}
