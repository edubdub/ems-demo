import * as React from 'react'
import Loading from '../../components/loading/loading'
import { connect } from 'react-redux'
import { IState } from '../../redux/store'
import { CSSTransitionGroup } from 'react-transition-group'

type LoadingSelector = (state: IState) => boolean
export default (loadingSelector: LoadingSelector) => {
  return function LoadingHOC<T>(
    WrappedComponent: React.ComponentClass<T> | React.StatelessComponent<T>
  ) {
    return connect((state: IState, ownProps: T) => ({
      HOCLoading: loadingSelector(state),
      ownProps
    }))(
      class LoadingHOC extends React.Component<{
        HOCLoading: boolean
        ownProps: T
      }> {
        render() {
          return (
            <span>
              <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
              >
                {this.props.HOCLoading && <Loading key="loading" />}
                {!this.props.HOCLoading && (
                  <WrappedComponent key="component" {...this.props.ownProps} />
                )}
              </CSSTransitionGroup>
            </span>
          )
        }
      }
    )
  }
}
