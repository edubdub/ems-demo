import { createAction } from 'redux-actions'
import { List } from 'immutable'
import { Booking } from '../../models/booking'

export const actions = {
  LOAD_BOOKINGS: 'LOAD_BOOKINGS',
  SET_BOOKINGS: 'SET_BOOKINGS',
  SET_SEARCH_TERMS: 'SET_SEARCH_TERMS',
  SET_USE_FUZZY_SEARCH: 'SET_USE_FUZZY_SEARCH',
  ADD_NEW_EVENT: 'ADD_NEW_EVENT'
}

export const actionCreators = {
  loadBookings: createAction(actions.LOAD_BOOKINGS, () => null),
  setBookings: createAction(actions.SET_BOOKINGS, (payload: Booking[]|List<Booking>) => List(payload)),
  setSearchTerms: createAction(actions.SET_SEARCH_TERMS, (payload: string) => payload),
  setUseFuzzySearch: createAction(actions.SET_USE_FUZZY_SEARCH, (payload: boolean) => payload)
}
