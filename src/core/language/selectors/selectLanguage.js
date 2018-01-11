import { LANGUAGE_STORE_NAME } from '../constants'

/**
 * select language state
 */
const selectLanguage = (state) => state.get(LANGUAGE_STORE_NAME)

export default selectLanguage
