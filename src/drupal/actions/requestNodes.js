import {
  DRUPAL_REQUEST_NODES,
} from 'drupal/constants'

/**
 * Request list of nodes
 *
 * @param  {id} node type
 * @param  {sort} sort
 * @param  {limit} limit
 *
 * @return {object}   An action object with a type of DRUPAL_REQUEST_NODES
 */
export default function requestNodes(id, sort = 'DESC', limit = '999') {
  return {
    type: DRUPAL_REQUEST_NODES,
    id,
    sort,
    limit,
  }
}
