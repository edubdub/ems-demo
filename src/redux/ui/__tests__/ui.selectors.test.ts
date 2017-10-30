import { getStore } from '../../store'
import selectors from '../selectors'
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
})
