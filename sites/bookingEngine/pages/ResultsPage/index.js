import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { autocomplete, withAvailabiltiesHotel } from 'features/Hotels'

require('./styles.scss')


export class ResultsPages extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    onSubmit: PropTypes.func,
    unfilteredHotel: PropTypes.any,
  }

  componentWillMount() {
    // console.log('SEARCH PAGE', this.props)
  }

  render() {
    const { unfilteredHotel } = this.props
    console.log('TEST', unfilteredHotel)
    return (
      <div>
        <h1>WBE-ResultsPage</h1>
        {unfilteredHotel &&
        <ul>
          {
            unfilteredHotel.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span><br />
                <span>{item.address}</span><br />
              </li>
            ))
          }
        </ul>
        }
      </div>
    )
  }
}

const enhancers = compose(autocomplete, withAvailabiltiesHotel)

export default enhancers(ResultsPages)
