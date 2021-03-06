/* global config */
import React from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray, reduxForm } from 'redux-form/immutable'

import Icon from 'common/components/Icon'
import FlatButton from 'common/components/FlatButton'
import Button from 'common/components/Button'
import NumericInput from 'common/components/NumericInput'
import Translation from 'core/language/components/Translation'
import Header from '../Header'

import './styles.scss'

const RoomsForm = ({
  handleSubmit,
  submitting,
  loading,
}) => {
  // eslint-disable-next-line
  const renderRooms = ({ fields }) => (
    <div className="RoomsForm">
      {fields.map((f, index) => (
        <div key={`${f.name}-${index}`} className="RoomsForm__RoomUpdate">
          <Header
            title={`ROOOOOM #${index + 1}`}
            leftIcon={<Icon name="bed" />}
            rightIcon={index > 0 ? (
              <FlatButton onClick={() => fields.remove(index)} tertiary>
                <Translation id="app.containers.SearchPage.room.remove" />
              </FlatButton>) : null}
          />
          <div className="Form">
            <Field
              name={`${f}.adult`}
              component={NumericInput}
              min={config.rooms.min.adult}
              max={config.rooms.max.adult}
              label="ADT"
            />
            <Field
              name={`${f}.child`}
              component={NumericInput}
              min={config.rooms.min.child}
              max={config.rooms.max.child}
              label={<Translation id="app.containers.SearchPage.room.guests" />}
              subLabel="UNDER 12"
              noBorder
            />
          </div>
        </div>
      ))}
      {fields.length < config.rooms.available && (
        <FlatButton
          onClick={() => fields.push({ ...config.rooms.min })}
          icon={<Icon name="add" />}
          tertiary
        >
          <Translation id="app.containers.SearchPage.addRoom" />
        </FlatButton>
      )}
    </div>
  )

  return (
    <div className="RoomsForm__Wrapper">
      <form onSubmit={handleSubmit}>
        <FieldArray name="rooms" component={renderRooms} />
        <div className="Form">
          <Button className="RoomsForm__ButtonAdd" type="button" disabled={submitting || loading} onClick={handleSubmit}>
            <Translation id="app.containers.SearchPage.selectRoom" />
          </Button>
        </div>
      </form>
    </div>
  )
}

RoomsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
}

export default reduxForm({
  form: 'roomsForm',
  enableReinitialize: true,
})(RoomsForm)
