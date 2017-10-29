import { takeLatest, call, put } from 'redux-saga/effects'
import { actions, actionCreators } from './actions'
import * as bookingService from '../../services/bookings'
export function * bookingSaga() {
  yield takeLatest(actions.LOAD_BOOKINGS, loadBookings)

}

export function * loadBookings () {
  const bookings = yield call(bookingService.requestBookings)
  yield put(actionCreators.setBookings(bookings))
}
