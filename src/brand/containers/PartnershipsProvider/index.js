/*
 *
 * PartnershipProvider
 *
 * this component connects the redux state partnership to the
 * IntlProvider component and i18n messages (loaded from `/translations`)
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { IntlProvider } from 'react-intl'
import {
  makeSelectPartnerships,
} from 'brand/selectors'
import { requestPartnerships } from 'brand/actions'

export class PartnershipsProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.onRequestPartnerships()
  }

  render() {
    return (
      <IntlProvider
        partnership={this.props.partnership}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    )
  }
}

PartnershipsProvider.propTypes = {
  onRequestPartnerships: PropTypes.func,
  children: PropTypes.element.isRequired,
  partnership: PropTypes.element.isRequired,
}

const mapStateToProps = createStructuredSelector({
  partnerships: makeSelectPartnerships(),
})

const mapDispatchToProps = (dispatch) => ({
  onRequestLanguages: () => dispatch(requestPartnerships()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PartnershipsProvider)
