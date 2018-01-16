import { List, Map } from 'immutable'
import {
  ADD_FILTER,
  UPDATE_FILTER,
  REMOVE_FILTER,
  RESET_FILTER,
  TOGGLE_FILTER,
  INIT_FILTER,
} from './constants'

const defaultState = new Map({})
// const defaultState = new Map({
//   stars: new Map({
//     rule: OR_RULE,
//     filters: [{
//       value: 3,
//       text: '3 stars',
//       name: 'matchFilterstars3',
//       compute: (item) => ([3].includes(item.stars)),
//       key: 'stars',
//       id: '3',
//     }, {
//       value: 4,
//       text: '4 stars',
//       name: 'matchFilterstars4',
//       compute: (item) => ([4].includes(item.stars)),
//       key: 'stars',
//       id: '4',
//     }, {
//       value: 5,
//       text: '5 stars',
//       name: 'matchFilterstars5',
//       compute: (item) => ([5].includes(item.stars)),
//       key: 'stars',
//       id: '5',
//     }],
//   }),
// })

const initialState = new Map({
  hotels: defaultState,
})

function filterReducer(state = initialState, action) {
  const where = [action.name, Array.isArray(action.key) ? action.key.join('.') : action.key, 'filters']
  switch (action.type) {
    case INIT_FILTER: {
      if (!state.getIn(where)) {
        return state.setIn(where.slice(0, -1), new Map({ rule: action.rule, filters: [] }))
      }
      return state
    }
    case ADD_FILTER: {
      if (state.getIn(where)) {
        return state.setIn(where, state.getIn(where).filter(((filter) => filter.name !== action.filter.name))).setIn(where, state.getIn(where).push(action.filter))
      }
      return state.setIn(where, new List(action.filter))
    }
    case UPDATE_FILTER: {
      return state.updateIn(
        where,
        (filters) => {
          if (filters && filters.find((filter) => filter.name === action.filter.name)) {
            return filters.filter((filter) => filter.name !== action.filter.name).concat(action.filter)
          }
          return [].concat(filters, action.filter)
        }
      )
    }
    case REMOVE_FILTER: {
      return state.updateIn(
        where,
        (filters) => (filters.filter((filter) => filter.name !== action.filter.name))
      )
    }
    case TOGGLE_FILTER: {
      return state.updateIn(
        where,
        (filters) => {
          if (filters && filters.find((filter) => filter.name === action.filter.name)) {
            return filters.filter((filter) => filter.name !== action.filter.name)
          }
          return [].concat(filters, action.filter)
        }
      )
    }
    case RESET_FILTER: {
      return state.updateIn([action.name], (filters) => filters.map((filter) => new Map({ rule: filter.rule, filters: [] })))
    }
    default:
      return state
  }
}

export default filterReducer
