import {
  DRUPAL_REQUEST_FAQ,
} from 'drupal/constants'

/**
 * Request informations of a faq
 *
 * @param  {id} id of faq
 *
 * @return {object}   An action object with a type of DRUPAL_REQUEST_FAQ
 */
export default function requestMenu(id) {
  return {
    type: DRUPAL_REQUEST_FAQ,
    id,
  }
}
