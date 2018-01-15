import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './styles.scss'

function Checkbox({
  input,
  name,
  meta,
  label,
  half,
  id,
  ...custom
}) {
  const wrapperClass = classNames('Checkbox', {
    'Checkbox--Half': half,
  })
  return (
    <div className={wrapperClass}>
      <input {...input} type="checkbox" id={id} className="Checkbox__Input" {...custom} />
      {label && (
        // eslint-disable-next-line
        <label htmlFor={id} className="Checkbox__Input__Label">
          {label}
        </label>
      )}
      {meta && meta.touched && meta.error && (
        <span className="Checkbox__Error">{meta.error}</span>
      )}
    </div>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  half: PropTypes.bool,
  input: PropTypes.object,
  meta: PropTypes.object,
  id: PropTypes.any.isRequired,
}

Checkbox.defaultProps = {
  label: null,
  name: null,
  half: false,
}

export default Checkbox
