import { compose } from 'redux'
import { connect } from 'react-redux'
import NavBar from './navBar'
import { IState } from '../../redux/store'
import selectors from '../../redux/selectors'
import actions from '../../redux/actions'
import { lifecycle } from 'recompose'
import tween from '../../utils/tween'
export default compose(
  connect((state: IState) => ({
    height: selectors.ui.navBarHeight(state),
    date: selectors.ui.navDate(state),
    shouldNavigateToDate: selectors.ui.shouldNavigateToDate(state),
    positionOfSelectedDate: selectors.ui.positionOfSelectedDate(state)
  }), {
    heightRealized: actions.ui.setNavBarHeight,
    onDateChange: actions.ui.setNavDate
  }),
  lifecycle({
    componentWillReceiveProps (nextProps: {shouldNavigateToDate: boolean, positionOfSelectedDate: number, height: number}) {
      if (nextProps.shouldNavigateToDate) {
        tween(window.scrollY, nextProps.positionOfSelectedDate - nextProps.height, 1000, (step) => {
          window.scrollTo(0, step)
        })
      }
    }
  })
)(NavBar)
