import { call, take, all, fork, select, cancel, put } from 'redux-saga/effects'
import { eventChannel, delay } from 'redux-saga'
import { actions, actionCreators } from './actions'
import selectors from './selectors'
import tween from '../../utils/tween'
import { List } from 'immutable'
const throttle = require('lodash.throttle')
export function * globalEventsSaga() {
  // wait for the nav bar height, and for at least one booking date to be rendered
  yield all[
    yield take(actions.SET_NAV_BAR_HEIGHT),
    yield take(actions.SET_BOOKING_DATE_WINDOW_POSITION)
  ]
  // there could be a bunch of bookings rendering at once, and it's jarring to have it load before
  // they have even appeared from the fade affect
  yield delay(500)
  yield scrollToSelectedDate()
  yield all([
    scrollSaga()
  ])
}

export function * scrollSaga () {
  while (true) {
    const watchScrollTask = yield fork(watchScroll)
    yield take(actions.USER_SET_NAV_DATE)
    cancel(watchScrollTask)
    yield scrollToSelectedDate()
  }
}

export function * scrollToSelectedDate () {
  const positionOfSelectedDate: number = yield select(selectors.positionOfSelectedDate)
  const height = yield select(selectors.navBarHeight)
  yield call(tween, window.scrollY, positionOfSelectedDate - height, 1000, (step: number) => {
    window.scrollTo(0, step)
  })
}

export function * watchScroll () {
  while (true) {
    try {
      const chan = yield call(scrollChannel)
      while (true) {
        const scrollPosition: {x: number, y: number} = yield take(chan)
        yield setDateFromScrollPosition(scrollPosition.y)
      }
    } finally {
      console.log('watchScroll terminated')
    }
  }
}

function * setDateFromScrollPosition (yScrollPosition: number) {
  const height = yield select(selectors.navBarHeight)
  const paddedYPosition = yScrollPosition + height + 50
  const datePositions: List<{bookingDate: Date, position: number}> = yield select(selectors.bookingDatePositions)
  const closestDatePosition = datePositions.reverse().find(datePosition => !!datePosition && paddedYPosition > datePosition.position)
  if (closestDatePosition) {
    yield put(actionCreators.setNavDate(closestDatePosition.bookingDate))
  }
}

const scrollChannel = () => {
  return eventChannel((emitter: (input: any) => any) => {
    const listener = throttle((event: Event) => { emitter({x: window.scrollX, y: window.scrollY}) }, 100, {leading: false, trailing: true})
    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
  })
}
