import {
  DRUPAL_REQUEST_MENU,
} from 'drupal/constants'

/**
 * Request informations of a menu
 *
 * @param  {id} id of menu
 *
 * @return {object}   An action object with a type of DRUPAL_REQUEST_MENU
 */
export default function requestMenu(id) {
  return {
    type: DRUPAL_REQUEST_MENU,
    id,
  }
}
