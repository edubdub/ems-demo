import { Action } from 'redux-actions'
import { takeLatest, call, put, take, select } from 'redux-saga/effects'
import { actions, actionCreators } from './actions'
import { actions as uiAction } from '../ui/actions'
import allActions from '../actions'
import * as bookingService from '../../services/bookings'
import { Booking } from '../../models/booking'
import selectors from './selectors'
import { List } from 'immutable'
import beginningOfDay from '../../utils/date/beginningOfDay'
export function * bookingSaga() {
  yield loadBookings(true)
  yield takeLatest(actions.LOAD_BOOKINGS, loadBookings, true)
  yield takeLatest(actions.ADD_BOOKING, addBooking)
}

export function * addBooking (action: Action<Booking>) {
  if (action.payload) {
    const dayOfStartDate = beginningOfDay(action.payload.start)
    // wait for booking el to render
    let actionFromPositionUpdate
    while (
      !actionFromPositionUpdate ||
      actionFromPositionUpdate.payload.bookingDate.getTime() !== dayOfStartDate.getTime()) {
      actionFromPositionUpdate = yield take(uiAction.SET_BOOKING_DATE_WINDOW_POSITION)
    }
    console.log('navigate too', dayOfStartDate)
    yield put(allActions.ui.userSetNavDate(dayOfStartDate))
    try {
      const bookings = yield call(bookingService.putBooking, action.payload)
      yield put(actionCreators.setBookings(bookings))
    } catch (e) {
      const allBookings: List<Booking> = yield select(selectors.allBookings)
      const bookingsWithoutPayload = allBookings.filter(b => !!b && b !== action.payload) as List<Booking>
      yield put(actionCreators.setBookings(bookingsWithoutPayload))
      alert('There was an error adding your event')
    }
  }
}

export function * loadBookings (setLoading: boolean) {
  if (setLoading) {
    yield put(actionCreators.setBookingLoading(true))
  }
  const bookings = yield call(bookingService.requestBookings)
  yield put(actionCreators.setBookings(bookings))
  if (setLoading) {
    yield put(actionCreators.setBookingLoading(false))
  }
}
