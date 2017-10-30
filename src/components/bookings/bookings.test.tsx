import * as React from 'react'
import { shallow } from 'enzyme'
import Bookings from './bookings'
import { data } from '../../services/bookings'
const beginningOfTime = '2017-10-27T18:08:37Z'
it('renders without crashing', () => {
  expect(
    shallow(
      <Bookings
        bookingPositionRealized={(bookingDate: Date, position: number) => null}
        bookingsByDay={{ [beginningOfTime]: data }}
      />
    )
  ).toMatchSnapshot()
})
