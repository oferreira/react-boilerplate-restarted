import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import injectReducer from 'core/reducers/utils/injectReducer'
import injectSaga from 'core/sagas/utils/injectSaga'

import rulesReducer from './reducers'
import saga from './sagas'
import { selectRules, selectWording } from './selectors'
import { requestCancelRules } from './actions'
import { CANCEL_RULES_STORE_NAME, DEFAULT_CANCELLATION_RULES } from './constants'

export default ({ hotelPropsKey, ratePlanCodePropsKey }) => (WrappedComponent) => {
  class CancelRules extends React.PureComponent {
    static WrappedComponent = WrappedComponent

    static propTypes = {
      onRequestCancelRules: PropTypes.func.isRequired,
      rules: PropTypes.object,
      wording: PropTypes.object,
      intl: intlShape.isRequired,
    }

    componentWillMount() {
      const {
        onRequestCancelRules,
      } = this.props

      if (!hotelPropsKey || !ratePlanCodePropsKey || !this.props[hotelPropsKey] || !this.props[ratePlanCodePropsKey]) {
        console.error('(Core/CancelRules...) Invalid options keys for HOC')
      } else {
        onRequestCancelRules(this.props[hotelPropsKey], this.props[ratePlanCodePropsKey])
      }
    }

    getWordingContent = () => {
      const {
        rules,
        wording,
      } = this.props

      const hotelId = this.props[hotelPropsKey]
      const ratePlanCode = this.props[ratePlanCodePropsKey]
      let wordingContent = false

      if (!hotelId || !ratePlanCode) return wordingContent

      if (rules.get(ratePlanCode) && rules.get(ratePlanCode)[0] && rules.get(ratePlanCode)[0].cancellationRule) {
        const cancellationRuleCode = rules.get(ratePlanCode) ? rules.get(ratePlanCode)[0].cancellationRule : null

        if (cancellationRuleCode && wording.get(cancellationRuleCode) && wording.get(cancellationRuleCode).body) {
          wordingContent = wording.get(cancellationRuleCode).body
        } else if (wording.get(DEFAULT_CANCELLATION_RULES)) {
          wordingContent = wording.get(DEFAULT_CANCELLATION_RULES).body
        } else {
          wordingContent = `<p>resortId : ${hotelId}  ratePlanCode : ${ratePlanCode}</p>`
        }
      }
      return wordingContent
    }

    render() {
      const customProps = {
        wordingContent: this.getWordingContent(),
      }

      return <WrappedComponent {...this.props} {...customProps} />
    }
  }

  const mapStateToProps = (props) => createStructuredSelector({
    rules: selectRules,
    wording: selectWording(props.intl, props[ratePlanCodePropsKey]),
  })

  const mapDispatchToProps = (dispatch) => ({
    onRequestCancelRules: (resortId, ratePlanCode) => dispatch(requestCancelRules(resortId, ratePlanCode)),
  })

  const withConnect = connect(mapStateToProps, mapDispatchToProps)
  const withReducer = injectReducer({ key: CANCEL_RULES_STORE_NAME, reducer: rulesReducer })
  const withSaga = injectSaga({ key: CANCEL_RULES_STORE_NAME, saga })

  return compose(
    injectIntl,
    withReducer,
    withSaga,
    withConnect,
  )(CancelRules)
}
