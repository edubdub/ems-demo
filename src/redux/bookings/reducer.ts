import { handleActions, Action } from 'redux-actions'
import { actions } from './actions'
import { Record, List } from 'immutable'
import { Booking } from '../../models/booking'
const initialState = {
  loading: false,
  bookings: List<{}>(),
  searchTerms: '',
  useFuzzySearch: true,
  addEventOpen: false
}
export class BookingState extends Record(initialState) {
  loading: boolean
  bookings: List<Booking>
  searchTerms: string
  useFuzzySearch: boolean
  addEventOpen: false
}
const defaultState = new BookingState(initialState)
const reducer = handleActions({
  [actions.LOAD_BOOKINGS](state: BookingState) {
    return state.set('bookings', List())
  },
  [actions.SET_BOOKINGS](state: BookingState, action: Action<Booking[]>) {
    return state.set('bookings', action.payload)
  },
  [actions.SET_SEARCH_TERMS](state: BookingState, action: Action<string>) {
    return state.set('searchTerms', action.payload)
  },
  [actions.SET_USE_FUZZY_SEARCH](state: BookingState, action: Action<boolean>) {
    return state.set('useFuzzySearch', action.payload)
  },
  [actions.ADD_BOOKING](state: BookingState, action: Action<Booking>) {
    if (action.payload) {
      return state.set('bookings', state.bookings.push(action.payload))
    }
    return state
  },
  [actions.SET_BOOKING_LOADING] (state: BookingState, action: Action<boolean>) {
    return state.set('loading', action.payload)
  }
} as any, defaultState)

export default reducer
