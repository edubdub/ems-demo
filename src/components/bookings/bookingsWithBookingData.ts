import Bookings from './bookings'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { IState } from '../../redux/store'
import selectors from '../../redux/selectors'
import Loading from '../../hoc/loading/loadingHOC'
import actionsCreators from '../../redux/actions'
export default compose(
  connect((state: IState) => ({
    bookingsByDay: selectors.bookings.bookingsByDate(state)
  }),
    {
      loadBookings: actionsCreators.bookings.loadBookings,
      bookingPositionRealized: actionsCreators.ui.setBookingDateWindowPosition
    }
  ),
  Loading(selectors.bookings.loading)
)(Bookings)
