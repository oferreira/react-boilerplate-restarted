import { STATE_NAME } from '../constants'

/**
 * select language state
 */
const selectLanguage = (state) => state.get(STATE_NAME)

export default selectLanguage
