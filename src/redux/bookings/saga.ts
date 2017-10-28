import { takeLatest, call } from 'redux-saga/effects'
import { actions } from './actions'
import * as bookingService from '../../services/bookings'
export function * bookingSaga() {
  console.log('sagas work')
  yield takeLatest(actions.LOAD_BOOKINGS, loadBookings)

}

export function * loadBookings () {
  const bookings = yield call(bookingService.requestBookings)
  console.log('bookings', bookings)
}
