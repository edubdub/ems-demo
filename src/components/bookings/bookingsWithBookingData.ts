import Bookings from './bookings'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import { IState } from '../../redux/store'
import selectors from '../../redux/selectors'
import Loading from '../../hoc/loading/loadingHOC'
import actionsCreators from '../../redux/actions'
console.log(actionsCreators.bookings)
export default compose(
  connect((state: IState) => ({
    bookingsByDay: selectors.bookings.bookingsByDate(state)
  }),
    {
      loadBookings: actionsCreators.bookings.loadBookings
    }
  ),
  lifecycle<{loadBookings: typeof actionsCreators.bookings.loadBookings}, any>({
    componentDidMount () {
      this.props.loadBookings()
    }
  }),
  Loading(selectors.bookings.loading)
)(Bookings)
