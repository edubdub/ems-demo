import { handleActions, Action, combineActions} from 'redux-actions'
import { actions } from './actions'
import { Record, List } from 'immutable'
const initialState = {
  navBarHeight: 64,
  bookingDatesToWindowPositions: List(),
  navDate: new Date(),
  shouldNavigateToDate: false,
  addEventOpen: false
}
export class UIState extends Record(initialState) {
  navBarHeight: number
  bookingDatesToWindowPositions: List<{bookingDate: Date, position: number}>
  navDate: Date
  shouldNavigateToDate: boolean
  addEventOpen: boolean
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
  [combineActions(actions.USER_SET_NAV_DATE, actions.SET_NAV_DATE)]: (state: UIState, action: Action<Date>) => {
    return state.set('navDate', action.payload).set('shouldNavigateToDate', true)
  },
  [actions.SET_ADD_EVENT_OPEN]: (state: UIState, action: Action<boolean>) => {
    return state.set('addEventOpen', action.payload)
  }
} as any, defaultState)

export default reducer
