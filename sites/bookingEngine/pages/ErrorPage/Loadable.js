/**
 * Asynchronously loads the component for HomePage
 */
import Loadable from 'react-loadable'
import HtmlLoadingIndicator from 'components/LoadingIndicator'

export default Loadable({
  loader: () => import('./index'),
  loading: HtmlLoadingIndicator,
})
