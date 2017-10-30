import * as React from 'react'
import AddBooking from './addBooking'
import { shallow } from 'enzyme'
it('renders without crashing', () => {
  expect(
    shallow(
      <AddBooking onSubmit={() => null} onRequestClose={() => null} open />
    )
  ).toMatchSnapshot()
})
