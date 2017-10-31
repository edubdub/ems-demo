import { createSelector } from 'reselect'
import { IState } from '../store'
import { Booking } from '../../models/booking'
import * as Fuse from 'fuse.js'
import beginningOfDay from '../../utils/date/beginningOfDay'
const fuseOptions = {
  shouldSort: false,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'eventName',
    'roomName'
  ]
}

const loading = (state: IState) => state.bookings.loading
const useFuzzySearch = (state: IState) => state.bookings.useFuzzySearch
const allBookings = (state: IState) => state.bookings.bookings
const searchableBookings = createSelector(allBookings, useFuzzySearch, (bookings, fs) => {
  if (fs) {
    return new Fuse(bookings.toArray(), fuseOptions)
  } else {
    return {
      search: (term: string) => bookings
        .toArray()
          .filter((b) => b &&
            b.eventName.toLowerCase().match(term.toLowerCase()) ||
            b.roomName.toLowerCase().match(term.toLowerCase()))
    }
  }
})
const currentSearchTerm = (state: IState) => state.bookings.searchTerms
const selectBookings = createSelector(
  searchableBookings,
  currentSearchTerm,
  allBookings,
  (searchableBookings, searchTerm, bookings) => searchTerm ? searchableBookings.search(searchTerm) : bookings)
const bookingsByDate = createSelector(selectBookings, (bookings: Array<Booking>) => {
  return bookings.reduce((map, b) => {
    const bookingDate = beginningOfDay(b.start).toISOString()
    map[bookingDate] = map[bookingDate] || []
    map[bookingDate].push(b)
    return map
  }, {})
})
export default {
  allBookings,
  selectBookings,
  loading,
  bookingsByDate,
  useFuzzySearch,
  currentSearchTerm
}
