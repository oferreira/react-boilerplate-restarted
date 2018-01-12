/* global config */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createSelector } from 'reselect';
import FormattedMessage from 'components/FormattedMessage';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import BookingRecover from 'components/BookingRecover';

import { requestOrder } from 'containers/Order/actions';
import { EXPAND_MY_BOOKING } from 'components/Expand/constants';
import { close } from 'components/Expand/actions';
import { getLocaleLanguage } from 'utils/languages';
import messages from './messages';

import './styles.scss';


function Links({ locale, onGetBooking, navigate }) {
  const linkLocale = getLocaleLanguage(locale);
  return (
    <ul className="F__Links">
      <li className="F__Link"><a className="F_linkItem" href={config.links.contacts[linkLocale]}><FormattedMessage {...messages.Contacts} /></a></li>
      <BookingRecover
        name={EXPAND_MY_BOOKING}
        title={<FormattedMessage {...messages.CancelReservation} />}
        toggleMessage={<FormattedMessage {...messages.CancelReservation} />}
        onSubmit={onGetBooking}
        navigate={navigate}
      />
      <li className="F__Link"><a className="F_linkItem" href={config.links.TermsAndConditions[linkLocale]}><FormattedMessage {...messages.TermsAndConditions} /></a></li>
      <li className="F__Link"><a className="F_linkItem" href={config.links.Careers[linkLocale]}><FormattedMessage {...messages.Careers} /></a></li>
      <li className="F__Link"><a className="F_linkItem" href={config.links.Press[linkLocale]}><FormattedMessage {...messages.Press} /></a></li>
      <li className="F__Link"><a className="F_linkItem" href={config.links.TravelAgents[linkLocale]}><FormattedMessage {...messages.TravelAgents} /></a></li>
      <li className="F__Link"><a className="F_linkItem" href={config.links.GiftCertificates[linkLocale]}><FormattedMessage {...messages.GiftCertificates} /></a></li>
    </ul>
  );
}

Links.propTypes = {
  locale: PropTypes.string,
  navigate: PropTypes.func,
  onGetBooking: PropTypes.func,
};

Links.defaultProps = {
  locale: null,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale }),
);

const mapDispatchToProps = (dispatch) => ({
  navigate: (url) => {
    dispatch(push(url));
    dispatch(close(EXPAND_MY_BOOKING));
  },
  onGetBooking: (id, name, promise) => dispatch(requestOrder(id, name, promise)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Links);
