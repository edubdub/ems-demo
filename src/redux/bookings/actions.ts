import { createActions } from 'redux-actions'
import { List } from 'immutable'
import { Booking } from '../../models/booking'

export const actions = {
  LOAD_BOOKINGS: 'LOAD_BOOKINGS',
  SET_BOOKINGS: 'SET_BOOKINGS'
}

export const actionCreators = createActions({
  [actions.LOAD_BOOKINGS]: () => null,
  [actions.SET_BOOKINGS]: (payload: List<Booking>) => payload
})
