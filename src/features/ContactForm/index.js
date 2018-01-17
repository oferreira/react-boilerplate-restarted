import React from 'react'
import PropTypes from 'prop-types'

import { Field, reduxForm, propTypes } from 'redux-form/immutable'

import './styles.scss'

const ContactForm = ({
  handleSubmit,
  pristine,
  submitting,
}) => (
  <form onSubmit={handleSubmit}>
    <Field
      id={1}
      name="gender"
      component="input"
      type="radio"
      value="0"
      label="toto1"
    />
    <Field
      id={2}
      name="gender"
      component="input"
      type="radio"
      value="1"
      label="toto2"
    />
    <Field
      name="firstName"
      component="input"
      type="text"
      label="FIIIIIRSTNAME"
    />
    <Field
      name="lastName"
      component="input"
      type="text"
      label="LAAAAAASTNAME"
    />
    <Field
      name="email"
      component="input"
      type="email"
      label="EMAIIIIL"
    />
    <button type="submit" className="Button Button--icon" disabled={pristine || submitting}>
      TOTO
    </button>
  </form>
)

ContactForm.propTypes = {
  ...propTypes,
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'payementform',
})(ContactForm)
