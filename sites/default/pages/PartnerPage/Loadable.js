/**
 * Asynchronously loads the component for HomePage
 */
import Loadable from 'react-loadable'
import LoadingIndicator from 'common/components/LoadingIndicator'

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator,
})
