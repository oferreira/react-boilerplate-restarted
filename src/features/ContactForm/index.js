import React from 'react'
import PropTypes from 'prop-types'

import { Field, reduxForm, propTypes } from 'redux-form/immutable'
import Input from 'html/components/Input'
import RadioButton from 'html/components/RadioButton'
import Checkbox from 'html/components/Checkbox'

// Utils
import validate from './validate'

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
      component={RadioButton}
      value="0"
      label="toto1"
    />
    <Field
      id={2}
      name="gender"
      component={RadioButton}
      value="1"
      label="toto2"
    />
    <Field
      name="firstName"
      component={Input}
      type="text"
      label="Fiiiirst naaaame"
      placeholder="FIIIIIRSTNAME"
    />
    <Field
      name="lastName"
      component={Input}
      disabled
      type="text"
      label="Laaast naaaaame"
      placeholder="LAAAAAASTNAME"
    />
    <Field
      name="email"
      component="input"
      type="email"
      label="EMAIIIIL"
    />
    <div className="PayementForm__Phone">
      <Field
        name="phoneCode"
        component="input"
        placeholder="PHONECOOOOOOODE"
        label="PHONECOOOOOOODE"
        type="select"
        // values={phoneCodes()}
        style={{ maxWidth: '10%' }}
      />
      <Field
        name="phone"
        component="input"
        type="text"
        label="PHOOOOOONE"
        style={{ minWidth: '90%' }}
      />
    </div>

    <Field
      name="country"
      component="input"
      type="select"
      label="COOOOUNTRY"
    />

    <div className="PayementForm__Newsletter">
      <Field
        id="newsletter"
        name="newsletter"
        label="NEEEEWSLETTER"
        component={Checkbox}
      />
    </div>
    {/* <div className="PayementForm__CommentWrapper">
      <Toggle
        name="CommentToggle" className="PayementForm__CommentWrapper__Button"
        opened={<Icon name="circle-less" />} closed={<Icon name="add-circle" />}
      >
        {intl.formatMessage(messages.addComment)}
      </Toggle>
      <Small name="CommentToggle">
        <Field
          name="comment" component={renderTextarea} type="text"
          label={intl.formatMessage(messages.addComment)}
        />
        <Field
          name="arrivalTime" component={renderInput} type="text" mask="11:11"
          label={intl.formatMessage(messages.arrivalTime)}
        />
      </Small>
    </div> */}
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
  validate,
})(ContactForm)
