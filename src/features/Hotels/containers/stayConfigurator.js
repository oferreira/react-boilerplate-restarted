import React from 'react'
import PropTypes from 'prop-types'

import WrapperForm from 'common/components/WrapperForm'

import RatesForm from 'features/Hotels/components/RatesForm'
import RoomsForm from 'features/Hotels/components/RoomsForm'

class StayConfigurator extends React.PureComponent {
  static propTypes = {
    
  }

  handleSelect = () => {}

  render() {
    return (
      <div>
        <WrapperForm>
          <RatesForm onSubmit={(a) => console.log('RATES', a)} />
          <RoomsForm onSubmit={(a) => console.log('ROOMS', a)} />
        </WrapperForm>
      </div>
    )
  }
}

export default StayConfigurator
