import { fromJS } from 'immutable'

import {
  BURGER_TOGGLE,
  STATE_NAME,
} from 'common/constants/burgerMenu'

export const initialState = fromJS({
  burgerMenu: false,
})


function reducer(state = initialState, action) {
  switch (action.type) {
    case BURGER_TOGGLE: {
      return state.set('burgerMenu', action.value)
    }
    default:
      return state
  }
}

export default {
  [STATE_NAME]: reducer,
}
