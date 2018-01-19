import React from 'react'
import PropTypes from 'prop-types'

import Header from 'common/components/Header'
import RightHeader from 'common/components/Header/RightHeader'
import Logo from 'common/components/Logo'


export class AppBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    
  }

  render() {
    return (
      <div>
        <Header>
          <Logo />
          <RightHeader />
        </Header>
      </div>
    )
  }
}

export default AppBar
