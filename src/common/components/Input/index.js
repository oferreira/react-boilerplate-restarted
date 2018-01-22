import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-maskedinput'
import classNames from 'classnames'

import './styles.scss'

class Input extends React.PureComponent {
  static propTypes = {
    label: PropTypes.any,
    half: PropTypes.bool,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    autoFocus: PropTypes.bool,
    lightOnDark: PropTypes.bool,
    input: PropTypes.object,
    meta: PropTypes.object,
    mask: PropTypes.string,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    errorClassName: PropTypes.string,
    loader: PropTypes.any,
  }

  static defaultProps = {
    label: null,
    half: false,
    disabled: false,
    lightOnDark: false,
    input: {},
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      setTimeout(() => { this.input.focus() }, 150)
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.autoFocus && this.props.autoFocus !== nextProps.autoFocus) {
      setTimeout(() => { this.input.focus() }, 150)
    }
  }

  render() {
    const {
      input,
      lightOnDark,
      label,
      disabled,
      meta,
      half,
      leftIcon,
      rightIcon,
      mask,
      labelClassName,
      errorClassName,
      className,
      loader,
      ...custom
    } = this.props

    const error = meta && meta.touched && meta.error ? meta.error : null
    const focused = meta && meta.active

    const wrapperClass = classNames('Input', {
      'Input--half': half,
      'Input--Light': lightOnDark,
    })
    const inputClass = classNames('Input__Wrapper', {
      'Input__Wrapper--Disabled': disabled,
      'Input__Wrapper--Focused': focused && !error,
      'Input__Wrapper--Error': error !== null,
      'Input__Wrapper--Light': lightOnDark,
      [className]: className,
    })
    const labelClass = classNames('Input__Label', {
      'Input__Label--Error': error !== null,
      'Input__Label--Light': lightOnDark,
      [labelClassName]: labelClassName,
    })
    const errorClass = classNames('Input__Error', {
      [errorClassName]: errorClassName,
    })

    return (
      <div className={wrapperClass}>
        {label && (
          // eslint-disable-next-line
          <label className={labelClass} htmlFor={input.id || name || input.name}>
            {label}
          </label>
        )}
        <div className={inputClass}>
          {typeof leftIcon !== 'undefined' && leftIcon}
          {mask && (
            <MaskedInput
              {...input}
              disabled={disabled}
              mask={mask}
              {...custom}
            />
          )}
          {!mask && (
            <input
              {...input}
              disabled={disabled}
              ref={(a) => (this.input = a)} // eslint-disable-line
              {...custom}
            />
          )}
          {loader}
          {typeof rightIcon !== 'undefined' && rightIcon}
        </div>
        {error && (
          <span className={errorClass}>
            {meta.error}
          </span>
        )}
      </div>
    )
  }
}

export default Input
