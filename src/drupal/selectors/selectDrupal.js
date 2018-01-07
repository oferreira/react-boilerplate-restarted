import { STATE_NAME } from 'drupal/constants'

/**
 * select drupal state
 */
const selectDrupal = (state) => state.get(STATE_NAME)

export default selectDrupal
