import { handleActions, Action } from 'redux-actions'
import { actions } from './actions'
import { Record, List } from 'immutable'
const initialState = {
  navBarHeight: 64,
  bookingDatesToWindowPositions: List(),
  navDate: new Date(),
  shouldNavigateToDate: false
}
export class UIState extends Record(initialState) {
  navBarHeight: number
  bookingDatesToWindowPositions: List<{bookingDate: Date, position: number}>
  navDate: Date
  shouldNavigateToDate: boolean
}
const defaultState = new UIState(initialState)
const reducer = handleActions({
  [actions.SET_NAV_BAR_HEIGHT]: (state: UIState, action: Action<number>) => {
    return state.set('navBarHeight', action.payload)
  },
  [actions.SET_BOOKING_DATE_WINDOW_POSITION]: (state: UIState, action: Action<{bookingDate: Date, position: number}>) => {
    const bookingDate = action.payload && action.payload.bookingDate
    const position = action.payload && action.payload.position
    if (!bookingDate || typeof position !== 'number') {
      return state
    }
    return state.set('bookingDatesToWindowPositions', state.bookingDatesToWindowPositions
      .filter(b => !!b && b.bookingDate.getTime() !== bookingDate.getTime()).concat({bookingDate: bookingDate, position }))
  },
  [actions.SET_NAV_DATE]: (state: UIState, action: Action<Date>) => {
    return state.set('navDate', action.payload).set('shouldNavigateToDate', true)
  }
} as any, defaultState)

export default reducer
