import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field, FieldArray } from 'redux-form/immutable'

import Header from 'common/components/Header'
import Button from 'common/components/Button'
import Input from 'common/components/Input'
import Icon from 'common/components/Icon'
import Translation from 'core/language/components/Translation'

import WrapperForm from 'features/Hotels/components/WrapperForm'
import RatesForm from 'features/Hotels/components/RatesForm'
import RoomsForm from 'features/Hotels/components/RoomsForm'

import { getSumFields } from 'features/Hotels/selectors'


class StayConfigurator extends React.PureComponent {
  static propTypes = {
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    hideLocation: PropTypes.bool,
  }

  handleSelect = () => {}

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      invalid,
      initialValues,
      hideLocation,
    } = this.props

    return (
      <Header noFlex>
        <WrapperForm
          inline
          onSubmit={handleSubmit(() => 'aa')}
          submitButton={
            <Button type="submit" disabled={pristine || submitting || invalid} onClick={handleSubmit}>
              <Translation id="app.containers.StayConfiguratorBar.availabilities" />
            </Button>
          }
        >
          {!hideLocation && (
            <div className="StayConfigurator__Component">
              <Field
                name="location"
                type="text"
                component={Input}
                placeholder="DESTIIII"
                leftIcon={<Icon name="search" />}
                lightOnDark
              />
            </div>
          )}
          <div className="StayConfigurator__Component">
            <Field
              name="arrival"
              type="text"
              component={Input}
              placeholder="(WAITING 4 NEW DATEPICKER)"
              leftIcon={<Icon name="arrival" />}
              lightOnDark
              readOnly
            />
            <Field
              name="departure"
              type="text"
              component={Input}
              placeholder="(WAITING 4 NEW DATEPICKER)"
              leftIcon={<Icon name="departure" />}
              lightOnDark
              readOnly
            />
          </div>
          <div className="StayConfigurator__Component">
            <FieldArray
              component={({ fields }) => (
                <Input
                  type="text"
                  readOnly
                  value={`${getSumFields(fields.getAll().toJS())}`}
                  // value={`${fields.length} ${fields.length > 1 ? 'ROOOOMS' : 'ROOOOOM'} - ${getSumFields(fields.getAll().toJS(), intl.formatMessage(messages.person), intl.formatMessage(messages.people))}`}
                  name="room"
                  placeholder="1 ROOOOOM - 1 ADUUUULT"
                  leftIcon={<Icon name="human" />}
                  lightOnDark
                  // onFocus={() => onResetForm('roomsForm')} // Init form on open
                />
              )}
              name="rooms"
            />
          </div>
        </WrapperForm>
        <RoomsForm
          onSubmit={(a) => console.log('ROOMS', a.toJS())}
          initialValues={initialValues}
        />
        <RatesForm
          initialValues={initialValues}
          onSubmit={(a) => console.log('RATES', a.toJS())}
        />
      </Header>
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
