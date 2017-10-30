import { getStore } from '../../store'
import selectors from '../selectors'
import { data } from '../../../services/bookings'
import { actionCreators } from '../actions'
describe('selectors', () => {
  describe('with default states', () => {
    let store = getStore()
    beforeEach(() => {
      store = getStore()
    })
    Object.keys(selectors).forEach(key => {
      it('should be the same with ' + key, () => {
        expect(selectors[key](store.getState())).toMatchSnapshot()
      })
    })
  })
  describe('with bookings', () => {
    let store = getStore()
    beforeEach(() => {
      store = getStore()
      store.dispatch(actionCreators.setBookings(data))
    })
    Object.keys(selectors).forEach(key => {
      it('should be the same with ' + key, () => {
        expect(selectors[key](store.getState())).toMatchSnapshot()
      })
    })
  })
  // TODO: this could use more unit tests, but i'm out of time, particularly the selectors for nearest dates
})
