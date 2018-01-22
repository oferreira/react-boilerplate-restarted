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
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import {
  makeSelectPartnerships,
} from 'brand/selectors'
import { requestPartnerships } from 'brand/actions'
import { injectBrandReducer } from 'brand/reducers'
import { injectDrupalFetchPartnershipsWatcher } from 'brand/sagas'
import PartnerShipList from 'brand/components/PartnerShipList'

export class PartnershipsProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.onRequestPartnerships()
  }

  render() {
    return (
      <div>
        <PartnerShipList
          partnerships={this.props.partnerships}
          title="Partnerships"
          numberOfCards={3}
        />
      </div>
    )
  }
}

PartnershipsProvider.propTypes = {
  onRequestPartnerships: PropTypes.func,
  partnerships: PropTypes.array,
}

const mapStateToProps = createStructuredSelector({
  partnerships: makeSelectPartnerships(),
})

const mapDispatchToProps = (dispatch) => ({
  onRequestPartnerships: () => dispatch(requestPartnerships()),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectBrandReducer()
const withSaga = injectDrupalFetchPartnershipsWatcher()

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PartnershipsProvider)
