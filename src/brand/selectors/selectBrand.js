import { BRAND_STORE_NAME } from '../constants'

/**
 * select brand state
 */
const selectBrand = (state) => state.get(BRAND_STORE_NAME)

export default selectBrand
