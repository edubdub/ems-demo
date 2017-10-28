import { createAction } from 'redux-actions'
import { List } from 'immutable'
import { Booking } from '../../models/booking'

export const actions = {
  LOAD_BOOKINGS: 'LOAD_BOOKINGS',
  SET_BOOKINGS: 'SET_BOOKINGS'
}

export const actionCreators = {
  loadBookings: createAction(actions.LOAD_BOOKINGS, () => null),
  setBookings: createAction(actions.SET_BOOKINGS, (payload: Booking[]|List<Booking>) => List(payload))
}
