import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'

import WrapperForm from 'common/components/WrapperForm'
import Button from 'components/Button'
import Translation from 'core/language/components/Translation'

import RatesForm from 'features/Hotels/components/RatesForm'
import RoomsForm from 'features/Hotels/components/RoomsForm'


class StayConfigurator extends React.PureComponent {
  static propTypes = {
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
  }

  handleSelect = () => {}

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      invalid,
      initialValues,
    } = this.props

    return (
      <div>
        <WrapperForm
          onSubmit={handleSubmit(() => 'aa')}
          submitButton={
            <Button type="submit" disabled={pristine || submitting || invalid} onClick={handleSubmit}>
              <Translation id="app.containers.StayConfiguratorBar.availabilities" />
            </Button>
          }
        >
          <RatesForm onSubmit={(a) => console.log('RATES', a.toJS())} />
          <RoomsForm
            onSubmit={(a) => console.log('ROOMS', a.toJS())}
            initialValues={initialValues}
          />
        </WrapperForm>
      </div>
    )
  }
}

const validate = (values) => {
  const errors = {}

  if (!values.get('location') || values.get('location').trim() === '') {
    errors.location = true
  }

  if (!values.get('rooms') || values.get('rooms').size === 0) {
    errors.rooms = true
  }

  if (!values.get('departure')) {
    errors.departure = true
  }

  if (!values.get('arrival')) {
    errors.arrival = true
  }

  return errors
}
const formName = 'completeSearchForm'
export default reduxForm({
  form: formName,
  enableReinitialize: true,
  validate,
})(StayConfigurator)
