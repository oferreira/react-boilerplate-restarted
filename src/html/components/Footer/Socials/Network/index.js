import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import Icon from '../../../Icon';
import './styles.scss';

const Network = ({ name, url, locale }) => (
  <Link
    to={url[locale] === undefined ? url.default : url[locale]}
    target="_blank"
    className={`Network Network--${name}`}
  >
    <Icon name={name} />
  </Link>
 );

Network.propTypes = {
  name: PropTypes.string,
  url: PropTypes.object,
  locale: PropTypes.string,
};

Network.defaultProps = {
  name: null,
  url: null,
  locale: null,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale }),
);

export default connect(mapStateToProps)(Network);
