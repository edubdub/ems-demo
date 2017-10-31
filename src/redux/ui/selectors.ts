import { createSelector } from 'reselect'
import { IState } from '../store'
import { List } from 'immutable'
const addEventOpen = (state: IState) => state.ui.addEventOpen
const navBarHeight = (state: IState) => state.ui.navBarHeight
const navDate = (state: IState) => state.ui.navDate
const bookingDatePositions = (state: IState) => state.ui.bookingDatesToWindowPositions
const shouldNavigateToDate = (state: IState) => state.ui.shouldNavigateToDate
const positionOfSelectedDate = createSelector(navDate, bookingDatePositions, (selectedDate: Date, positions: List<{bookingDate: Date, position: number}>) => {
  if (positions.count() < 1) {
    return 0
  }
  const position = positions
  .filter(b => !!b)
  .find(b => !!b && b.bookingDate.getTime() >= selectedDate.getTime())
  return position && position.position ? position.position : positions.get(positions.count() - 1).position
})

export default {
  addEventOpen,
  navBarHeight,
  navDate,
  bookingDatePositions,
  positionOfSelectedDate,
  shouldNavigateToDate
}
