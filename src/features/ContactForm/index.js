import React from 'react'
import PropTypes from 'prop-types'

import { Field, reduxForm, propTypes } from 'redux-form/immutable'
import Input from 'common/components/Input'
import RadioButton from 'common/components/RadioButton'
import Checkbox from 'common/components/Checkbox'
import Select from 'common/components/Select'

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
      type="radio"
      value="0"
      label="toto1"
    />
    <Field
      id={2}
      name="gender"
      component={RadioButton}
      type="radio"
      value="1"
      label="toto2"
    />
    <Field
      name="firstName"
      component={Input}
      type="text"
      label="FIIIIIRSTNAME"
    />
    <Field
      name="lastName"
      component={Input}
      type="text"
      label="LAAAAAASTNAME"
    />
    <Field
      name="email"
      component={Input}
      type="email"
      label="EMAIIIIL"
    />
    {/*<div className="PayementForm__Phone">
      <Field
        name="phoneCode"
        component={Select}
        placeholder="PHONECOOOOOOODE"
        label="PHONECOOOOOOODE"
        style={{ maxWidth: '10%' }}
      >
        <option value="1">11111</option>
        <option value="2">22222</option>
        <option value="3">33333</option>
      </Field>
      <Field
        name="phoneCode2"
        disabled
        component={Select}
        placeholder="PHONECOOOOOOODE2"
        label="PHONECOOOOOOODE2"
      >
        <option value="1">11111</option>
        <option value="2">22222</option>
        <option value="3">33333</option>
      </Field>
      <Field
        name="phone"
        component="input"
        type="text"
        label="PHOOOOOONE"
        style={{ minWidth: '90%' }}
      />
</div> */}

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
