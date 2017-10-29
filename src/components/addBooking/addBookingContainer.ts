import { compose } from 'redux'
import { connect } from 'react-redux'
import AddBooking from './addBooking'
import { IState } from '../../redux/store'
import selectors from '../../redux/selectors'
import { actionCreators } from '../../redux/ui/actions'
export default compose (
  connect((state: IState) => ({
    open: selectors.ui.addEventOpen(state)
  }), {
    onRequestClose: actionCreators.setAddEventOpen
  })
)(AddBooking)
