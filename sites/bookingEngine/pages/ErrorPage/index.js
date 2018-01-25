import React from 'react'

require('./styles.scss')


class ErrorPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        LA PAAAAGE DEMANDEE N&apos;EXISTE PAS... :(
      </div>
    )
  }
}

export default ErrorPage
