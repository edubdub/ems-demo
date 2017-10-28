// import { createSelector } from 'reselect'
import { BookingState } from './reducer'
const selectBookings = (state: BookingState) => state.bookings
export default {
  selectBookings
}
