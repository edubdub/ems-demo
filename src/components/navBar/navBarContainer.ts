import { compose } from 'redux'
import { connect } from 'react-redux'
import NavBar from './navBar'
import { IState } from '../../redux/store'
import selectors from '../../redux/selectors'
import actions from '../../redux/actions'
export default compose(
  connect((state: IState) => ({
    height: selectors.ui.navBarHeight(state),
    date: selectors.ui.navDate(state),
    searchTerm: selectors.bookings.currentSearchTerm(state),
    fuzzySearch: selectors.bookings.useFuzzySearch(state)
  }), {
    heightRealized: actions.ui.setNavBarHeight,
    onDateChange: actions.ui.userSetNavDate,
    onSearchTermChange: actions.bookings.setSearchTerms,
    onFuzzySearchChange: actions.bookings.setUseFuzzySearch,
    onPlusClick: () => actions.ui.setAddEventOpen(true)
  })
)(NavBar)
