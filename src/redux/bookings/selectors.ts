// import { createSelector } from 'reselect'
import { IState } from '../store'
import { createSelector } from 'reselect'
import { List } from 'immutable'
import { Booking } from '../../models/booking'
const selectBookings = (state: IState) => state.bookings.bookings
const loading = (state: IState) => state.bookings.loading
const bookingsByDate = createSelector(selectBookings, (bookings: List<Booking>) => {
  return bookings.toArray().reduce((map, b) => {
    const bookingDate = new Date(b.start).toISOString()
    map[bookingDate] = map[bookingDate] || []
    map[bookingDate].push(b)
    return map
  }, {})
})
export default {
  selectBookings,
  loading,
  bookingsByDate
}
