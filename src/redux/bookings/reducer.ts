import { handleActions, Action } from 'redux-actions'
import { actions } from './actions'
import { Record, List } from 'immutable'
import { Booking } from '../../models/booking'
const initialState = {
  loadingBookings: false,
  bookings: List<{}>()
}
export class BookingState extends Record(initialState) {
  loadingBookings: boolean
  bookings: List<Booking>
}
const defaultState = new BookingState(initialState)
const reducer = handleActions({
  [actions.LOAD_BOOKINGS](state) {
    return state.set('bookings', List()).set('loadingBookings', true)
  },
  [actions.SET_BOOKINGS](state, action: Action<Booking[]>) {
    return state.set('bookings', action.payload).set('loadingBookings', false)
  }
}, defaultState)

export default reducer
