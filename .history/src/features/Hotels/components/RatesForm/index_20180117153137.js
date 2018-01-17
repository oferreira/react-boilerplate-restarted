/* global config */
import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form/immutable'
import { injectIntl, intlShape } from 'react-intl'

// Components
import WrapperForm from 'components/WrapperForm'
import Button from 'components/Button'
import Input from 'components/Input'
import RadioButton from 'components/RadioButton'
import Translation from 'core/language/components/Translation'

import './styles.scss'

// Mock special rates code in Json
const rateTypes = config.specialRates

const Form = ({
  handleSubmit,
  submitting,
  pristine,
  intl,
  invalid,
}) => (console.log(Translation.toto()),
  <WrapperForm
    onSubmit={handleSubmit}
    submitButton={
      <Button type="submit" disabled={pristine || submitting || invalid} onClick={handleSubmit}>
        <Translation id="app.containers.SearchPage.rates.save" />
      </Button>
    }
  >
    <div className="RatesForm__Wrapper">
      {rateTypes.map((rt, index) => (
        <Field
          key={rt}
          name="rateType"
          component={RadioButton}
          type="radio"
          value={rt}
          id={index}
          label={<Translation id={`app.containers.SearchPage.rates.${rt}`} />}
          lightOnDark
        />
      ))}
    </div>
    <div className="RatesForm__Wrapper-code">
      <Field
        name="rateCode"
        component={Input}
        type="text"
        placeholder={intl.formatMessage({ id: 'app.containers.SearchPage.rates.numberCode' })}
        maxLength={13}
        lightOnDark
      />
    </div>
  </WrapperForm>
)

Form.propTypes = {
  intl: intlShape,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
}

const validate = (values) => {
  const errors = {}

  if (!values.get('rateCode')) {
    errors.rateCode = true
  }

  if (!values.get('rateType')) {
    errors.rateType = true
  }

  return errors
}

const RatesForm = reduxForm({
  form: 'ratesForm',
  validate,
})(Form)

export default injectIntl(RatesForm)
