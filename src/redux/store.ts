import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import bookingReducer, { BookingState } from './bookings/reducer'
import { bookingSaga } from './bookings/saga'
export interface IState {
  bookings: BookingState
}

const reducer = combineReducers({
  bookings: bookingReducer
})
const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(bookingSaga)
