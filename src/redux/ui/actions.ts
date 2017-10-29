import { createAction } from 'redux-actions'
export const actions = {
  SET_NAV_BAR_HEIGHT: 'SET_NAV_BAR_HEIGHT',
  SET_BOOKING_DATE_WINDOW_POSITION: 'SET_BOOKING_DATE_WINDOW_POSITION',
  SET_NAV_DATE: 'SET_NAV_DATE'
}

export const actionCreators = {
  setNavBarHeight: createAction(actions.SET_NAV_BAR_HEIGHT, (height: number) => height),
  setBookingDateWindowPosition: createAction(
    actions.SET_BOOKING_DATE_WINDOW_POSITION,
    (bookingDate: string, position: number) => ({
      bookingDate, position
    })),
  setNavDate: createAction<Date>(actions.SET_NAV_DATE)

}
