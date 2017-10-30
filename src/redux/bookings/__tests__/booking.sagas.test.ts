import * as sagas from '../saga'
describe('saga', () => {
  // If I had more time for this, testing something things by more than snapshots would be better
  describe('load bookings', () => {
    const loadBookings = sagas.loadBookings
    it('it should set loading true if true is passed in', () => {
      const iterator = loadBookings(true)
      let result
      while (!result || !result.done) {
        result = iterator.next()
        expect(result).toMatchSnapshot('loadBookings with loading true, step: ')
      }
    })
    it('it should skip loading if false is passed in', () => {
      const iterator = loadBookings(false)
      let result
      while (!result || !result.done) {
        result = iterator.next()
        expect(result).toMatchSnapshot('loadBookings with loading false, step: ')
      }
    })
  })
})
