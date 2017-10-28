import * as React from 'react'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import { Booking } from '../../models/booking'
import Subheader from 'material-ui/Subheader'
import dateIsToday from '../../utils/date/dateIsToday'
export default class Bookings extends React.PureComponent<{
  bookingsByDay: { [key: string]: Booking[] }
}> {
  render() {
    return Object.keys(this.props.bookingsByDay)
      .sort()
      .reduce(
        (all, date) => {
          all.push(
            <Divider key={date + '-divider-open'} />,
            <Subheader key={date + '-subHeader'}>
              {dateIsToday(date) && 'Today'}
              {new Date(date).toLocaleDateString()}
            </Subheader>,
            <Divider key={date + '-divider-close'} />,
            <BookingsList
              key={date}
              bookings={this.props.bookingsByDay[date] || []}
            />
          )
          return all
        },
        [] as JSX.Element[]
      )
  }
}
class BookingsList extends React.PureComponent<{
  bookings: Booking[]
}> {
  render() {
    return (
      <List>
        {this.props.bookings.map(
          booking =>
            booking && (
              <ListItem key={booking.id} primaryText={booking.eventName} />
            )
        )}
      </List>
    )
  }
}
