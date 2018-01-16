import React from 'react'
import PropTypes from 'prop-types'
import gtmParts from 'react-google-tag-manager'

class GoogleTagManager extends React.PureComponent {
  static propTypes = {
    gtmId: PropTypes.string.isRequired,
    additionalEvents: PropTypes.object,
    previewVariables: PropTypes.string,
    scriptId: PropTypes.string,
  }

  componentDidMount() {
    try {
      const dataLayerName = this.getDataLayerName()
      const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm'

      if (!window[dataLayerName]) {
        const gtmScriptNode = document.getElementById(scriptId)

        eval(gtmScriptNode.textContent); // eslint-disable-line
      }
    } catch (e) {
      console.error(e)
    }
  }

  getDataLayerName() {
    return 'dataLayer'
  }

  render() {
    const gtm = gtmParts({
      scheme: 'https:',
      id: this.props.gtmId,
      dataLayerName: 'dataLayer',
      additionalEvents: this.props.additionalEvents || {},
      previewVariables: this.props.previewVariables || false,
    })

    return (
      <div>
        <div>{gtm.noScriptAsReact()}</div>
        <div id={this.props.scriptId || 'react-google-tag-manager-gtm'}>
          {gtm.scriptAsReact()}
        </div>
      </div>
    )
  }
}

export default GoogleTagManager
