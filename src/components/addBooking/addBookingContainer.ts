import { compose } from 'redux'
import { connect } from 'react-redux'
import AddBooking from './addBooking'
import { IState } from '../../redux/store'
import selectors from '../../redux/selectors'
import actions from '../../redux/actions'
export default compose (
  connect((state: IState) => ({
    open: selectors.ui.addEventOpen(state)
  }), {
    onRequestClose: actions.ui.setAddEventOpen,
    onSubmit: actions.bookings.addBooking
  })
)(AddBooking)
