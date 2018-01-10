import { DRUPAL_STATE_NAME } from 'drupal/constants'

/**
 * select drupal state
 */
const selectDrupal = (state) => state.get(DRUPAL_STATE_NAME)

export default selectDrupal
