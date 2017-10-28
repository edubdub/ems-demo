import * as React from 'react'
import Loading from '../../components/loading/loading'
import { connect } from 'react-redux'
import { IState } from '../../redux/store'
type LoadingSelector = (state: IState) => boolean
export default function LoadingHOC<T>(
  WrappedComponent: React.ComponentClass<T> | React.StatelessComponent<T>,
  loadingSelector: LoadingSelector
) {
  return connect((state: IState, ownProps: T) => ({
    HOCLoading: loadingSelector(state),
    ownProps
  }))(
    props =>
      props.HOCLoading ? <Loading /> : <WrappedComponent {...props.ownProps} />
  )
}
