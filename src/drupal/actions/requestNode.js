import {
  DRUPAL_REQUEST_NODE,
} from 'drupal/constants'

/**
 * Request informations of a node
 *
 * @param  {id} id of node
 *
 * @return {object}   An action object with a type of DRUPAL_REQUEST_NODE
 */
export default function requestNode(id) {
  return {
    type: DRUPAL_REQUEST_NODE,
    id,
  }
}
