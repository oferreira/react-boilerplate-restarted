import React, { PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { Field } from 'redux-form/immutable';

/**
 * Custom imports
 */
import moment from 'moment';
import Wrapper from 'components/Expand/Wrapper';
import DropDown from 'components/Expand/DropDown';
import Autocomplete from 'containers/Autocomplete';

// Selectors
import { getSelectLocale } from 'containers/LanguageProvider/selectors';
import { getIsOpened } from 'containers/Search/selectors';

import { getCurrentLocation } from 'containers/Autocomplete/actions';
import { autoComplete } from 'containers/Search/actions';

import messages from '../messages';

require('../styles.scss');
require('./styles.scss');

class Form extends React.Component {
  /**
   * Select a new location value
   */
  onSelect = (_value = '', item, isOldSearch = false) => {
    let params = {};
    // push the selected hotel in the url
    if (item.name) {
      params.resortId = item.id;
    } else {
      params.resortId = null;
    }
    params.location = _value.toLowerCase();

    if (isOldSearch) {
      params = { ...item };
      // We apply today / tomorrow as dates of stay if the expected dates are passed.
      const currentDay = moment();
      const nextDay = moment().add(1, 'days');
      params.arrival = moment(params.arrival, 'YYYY-MM-DDT00:00:00') < currentDay ? currentDay.format('YYYY-MM-DDT00:00:00') : params.arrival;
      params.departure = moment(params.departure, 'YYYY-MM-DDT00:00:00') < nextDay ? nextDay.format('YYYY-MM-DDT00:00:00') : params.departure;
    }

    this.props.onSubmit(new Map(params));
  }

  /**
   * Use current location
   */
  onCurrentLocation = () => (
    new Promise((resolve, reject) => (
      this.props.getCurrentLocation({ resolve, reject })
    ))
    .then((currentLocation) => this.props.onSubmit(new Map({ location: currentLocation.toLowerCase(), resortId: null })))
    .catch((error) => error)
  )

  /**
   * Close dropdown and submit the field value
   */
  onCloseDropdown = () => {
    const updateOnly = true;
    this.props.onSubmit(new Map({ location: this.props.currentLocation }), updateOnly);
  }

  render() {
    const { intl, inputIcon, isOpened, hookOnToggle, error } = this.props;

    const wrapper = (items, name) => (
      <div>
        <Wrapper>
          <DropDown
            name={name}
            className="AutoCompleteList__Wrapper"
            hookOnClose={this.onCloseDropdown}
          >
            {items}
          </DropDown>
        </Wrapper>
      </div>
    );

    return (
      <div className="AutoCompleteList">
        <Field
          name="location"
          iconName="search"
          autoComplete="off"
          component={Autocomplete}
          type="text"
          placeholder={error ? intl.formatMessage(messages.currentLocationError) : intl.formatMessage(messages.inputlocation)}
          textIcon={inputIcon}
          autoFocus={isOpened}
          wrapper={wrapper}
          hookOnToggle={hookOnToggle}
          onSelect={this.onSelect}
          onCurrentLocation={this.onCurrentLocation}
        />
      </div>
    );
  }
}

Form.propTypes = {
  /**
   * @redux form
   */
  onSubmit: PropTypes.func.isRequired,
  getCurrentLocation: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  inputIcon: PropTypes.node,
  hookOnToggle: PropTypes.func,
  isOpened: PropTypes.bool,
  error: PropTypes.any,
  currentLocation: PropTypes.string,
};

Form.defaultProps = {
  autoFocus: false,
  isOpened: false,
};

const mapStateToProps = () => createStructuredSelector({
  locale: getSelectLocale,
  isOpened: getIsOpened(),
});

const mapDispatchToProps = (dispatch) => ({
  keyDownHandler: (address) => dispatch(autoComplete(address)),
  getCurrentLocation: (promise) => dispatch(getCurrentLocation(promise)),
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);

export default injectIntl(ConnectedForm);
