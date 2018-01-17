import React from 'react'
import PropTypes from 'prop-types'
import changeLocale from 'core/language/actions/changeLocale'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Icon from 'common/components/Icon'
import './styles.scss'

class Select extends React.PureComponent {
  static propTypes = {
    items: PropTypes.array,
    onChangeLocale: PropTypes.func,
  }

  componentWillMount() {
    this.props.onChangeLocale('en-us')
    this.onChangeLocale = this.onChangeLocale.bind(this)
  }

  onChangeLocale(event) {
    this.props.onChangeLocale(event.target.value)
  }

  render() {
    const content = Object.keys(this.props.items).map((id) => {
      const {
        key,
        value,
      } = this.props.items[id]

      return (
        <option key={key} value={key}>{value}</option>
      )
    })

    return (
      <div className="Select__Wrapper">
        <span className="Select__Wrapper__Icon">
          <Icon name="arrow-bot" />
        </span>
        <select
          className="select"
          onChange={this.onChangeLocale}
        >
          {content}
        </select>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  onChangeLocale: (locale) => dispatch(changeLocale(locale)),
})

const withConnect = connect(null, mapDispatchToProps)

export default compose(
  withConnect,
)(Select)

