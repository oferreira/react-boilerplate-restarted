import {
  REQUEST_NODE,
} from 'drupal/constants'

/**
 * Request informations of a node
 *
 * @param  {id} id of node
 *
 * @return {object}   An action object with a type of REQUEST_NODE
 */
export default function requestNode(id) {
  return {
    type: REQUEST_NODE,
    id,
  }
}
