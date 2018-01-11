/**
*
* NumericInput
*
*/
import React from 'react'
import PropTypes from 'prop-types'

require('./styles.scss')

class NumericInput extends React.Component {
  static propTypes = {
    /**
     * Passed by form
     */
    input: PropTypes.object,
    /**
     * Passed by @redux-form
     * @optionnal
     */
    meta: PropTypes.object,
    /**
     * Display a label on top of the component
     * @optionnal
     */
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    subLabel: PropTypes.any,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    /**
     * Remove the border bottom of the wrapper
     * @optionnal
     */
    noBorder: PropTypes.bool,
  }

  state = {
    value: parseInt(this.props.value, 10) || parseInt(this.props.input.value, 10) || parseInt(this.props.min, 10) || 0,
  }

  // Avoid value to be superior to max and inferior to min during the initialize
  componentWillMount() {
    const { min, max, input } = this.props
    const { value } = this.state

    if (max !== undefined && !Number.isNaN(max) && value > max) {
      this.setState({ value: max })
      input.onChange(max)
    } else if (min !== undefined && !Number.isNaN(min) && value < min) {
      this.setState({ value: min })
      input.onChange(min)
    }
  }

  // The user click on + / -
  handleChange = (up) => {
    const { min, max, input } = this.props
    const { value } = this.state
    let newValue = 0

    // Get the new value adding or removing 1 according to min and max props
    if (up) {
      if (max !== undefined && !Number.isNaN(max)) {
        newValue = value < max ? parseInt(value, 10) + 1 : value
      } else {
        newValue = parseInt(value, 10) + 1
      }
    } else {
      if (min !== undefined && !Number.isNaN(min)) { // eslint-disable-line
        newValue = value > min ? parseInt(value, 10) - 1 : value
      } else {
        newValue = parseInt(value, 10) - 1
      }
    }

    // Set the new value and call onChange input method with this new value in order to emmit the onChange event
    this.setState({ value: newValue })
    input.onChange(newValue)
  }

  render() {
    const {
      input,
      label,
      subLabel,
      meta,
      noBorder,
      ...custom
    } = this.props

    return (
      <div className={noBorder ? 'NumericInput__Wrapper-noBorder' : 'NumericInput__Wrapper'}>
        {label && (
          <div>
            <span className="NumericInput__Label">{label}</span>
            <span className="NumericInput__Label-mini">{subLabel}</span>
          </div>
        )}
        <div className="NumericInput__InputWrap">
          <button type="button" title="" className="NumericInput__Button" onClick={() => this.handleChange()}><span>-</span></button>
          <input
            {...input}
            title="" // Avoid [Object, Object] display
            disabled
            readOnly
            type="text"
            value={this.state.value !== undefined ? this.state.value : input.value}
            className="NumericInput"
            {...custom}
          />
          <button type="button" title="" className="NumericInput__Button" onClick={() => this.handleChange(true)}>+</button>
        </div>
        {meta && meta.touched && meta.error && <span className="NumericInput__Error">{meta.error}</span>}
      </div>
    )
  }
}

export default NumericInput
