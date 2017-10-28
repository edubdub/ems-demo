import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Bookings from './bookings'
import { data } from '../../services/bookings'
const bookingsByDay = data.reduce((map, b) => {
  const bookingDate = new Date(b.start).toISOString()
  map[bookingDate] = map[bookingDate] || []
  map[bookingDate].push(b)
  return map
}, {})
storiesOf('components/bookings', module).add('default', () => (
  <Bookings bookingsByDay={bookingsByDay} />
))
