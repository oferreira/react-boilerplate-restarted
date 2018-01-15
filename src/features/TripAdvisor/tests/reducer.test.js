
import { fromJS } from 'immutable'
import tripAdvisorReducer from '../reducers'

describe('tripAdvisorReducer', () => {
  it('returns the initial state', () => {
    expect(tripAdvisorReducer(undefined, {})).toEqual(fromJS({}))
  })
})
