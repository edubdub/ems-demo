import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import bookingReducer, { BookingState } from './bookings/reducer'
import uiReducer, { UIState } from './ui/reducer'
import { bookingSaga } from './bookings/saga'
export interface IState {
  bookings: BookingState,
  ui: UIState
}

const reducer = combineReducers({
  bookings: bookingReducer,
  ui: uiReducer
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware
    )
  )

)
sagaMiddleware.run(bookingSaga)
