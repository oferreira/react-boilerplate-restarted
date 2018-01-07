import { STATE_NAME } from 'drupal/constants'

/**
 * select language state
 */
const selectNodes = (state) => state.get(STATE_NAME)

export default selectNodes
