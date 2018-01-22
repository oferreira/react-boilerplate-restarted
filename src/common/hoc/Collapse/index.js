import React from 'react'
import className from 'classnames'
import './styles.scss'

const Collapse = (Toggle) => (WrappedComponent) => (
  class extends React.Component {
    state = {
      isOpen: false,
    }

    toggle = () => (
      this.setState({ isOpen: !this.state.isOpen })
    )

    render() {
      const classes = className(
        'Collapse',
        { 'Collapse--isOpen': this.state.isOpen }
      )

      return (
        <div className="Collapse__Container">
          <button onClick={this.toggle} className="Collapse__Toggle">
            <Toggle />
          </button>
          <div className={classes}>
            <WrappedComponent {...this.props} />
          </div>
        </div>
      )
    }
  }
)

export default Collapse
