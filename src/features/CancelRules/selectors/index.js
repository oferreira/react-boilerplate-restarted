import { createSelector, createStructuredSelector } from 'reselect'
import moment from 'moment'
// import { updateMomentLocale } from 'utils/languages'

import { LANGUAGE_STORE_NAME } from 'core/language/constants'

import messages from '../messages'
import { CANCEL_RULES_STORE_NAME, DEFAULT_CANCELLATION_RULES } from '../constants'


// global selectors
export const selectLanguage = (state) => state.get(LANGUAGE_STORE_NAME)

// select Rules
export const selectCancelRules = (state) => state.get(CANCEL_RULES_STORE_NAME)

export const selectRules = createSelector(
  selectCancelRules,
  (state) => state.get('rules')
)

export const selectLocale = createSelector(
  selectLanguage,
  (state) => state.get('locale')
)

export const selectWording = (intl, ratePlanCode) => createSelector(
  selectCancelRules,
  selectRules,
  selectLocale,
  (state, rulesList, lang) => {
    const wordings = state.get('wording')
    let rules = rulesList.get(ratePlanCode)
    rules = rules && rules[0] ? rules[0] : {}

    wordings.keySeq().forEach((wordingKey) => {
      const wording = wordings.get(wordingKey)
      const date = moment(rules.cancelBeforeTime, 'DD/MM/YYYY HH:mm:ss')

      if (wording.title !== rules.cancellationRule && wording.title !== DEFAULT_CANCELLATION_RULES) return
      if (wording.title === DEFAULT_CANCELLATION_RULES && rules.cancellationRule === 'NO CXL') return
      if (!intl || !wording || wording.size === 0) return
      if (!moment(date).isValid()) return
      let { body } = wording
      const types = rules.type ? rules.type.toLowerCase() : ''

      // translate months in locale language
      // updateMomentLocale(lang)

      // new string replace
      const day = `${date.format('DD')} ${date.format('MMMM')}`
      const hours = date.format('LT')
      // replace day
      body = body.replace('{0:D}', day)
      // replace hours
      body = body.replace('{0:HH\':\'mm}', hours)
      // replace penaltyAmount
      body = body.replace('{1}', `${rules.penaltyAmount} ${messages[types] ? intl.formatMessage(messages[types]) : ''}`)

      wording.body = body
      wordings.set(wordingKey, wording)
    })
    return wordings
  }
)

// mixe rules and wording
export const rules = createStructuredSelector({
  cancelRules: selectCancelRules,
  wording: selectWording,
})
