import * as React from 'react'
import Paper from 'material-ui/Paper'
import { Booking } from '../../models/booking'
import Subheader from 'material-ui/Subheader'
import dateIsToday from '../../utils/date/dateIsToday'
import humanReadableDateDiff from '../../utils/date/humanReadableDateDifference'
import pad from '../../utils/pad'
export default class Bookings extends React.PureComponent<{
  bookingsByDay: { [key: string]: Booking[] }
  bookingPositionRealized: (bookingDate: Date, position: number) => any
}> {
  render() {
    return (
      <div style={{ flex: 1, flexDirection: 'column' }}>
        <div style={{ flex: 0 }}>
          {Object.keys(this.props.bookingsByDay)
            .sort()
            .reduce(
              (all, date) => {
                all.push(
                  <Paper
                    key={date + '-subHeader'}
                    style={{ marginBottom: 5, marginTop: 5 }}
                  >
                    <Paper>
                      <span
                        ref={el =>
                          el &&
                          this.props.bookingPositionRealized(
                            new Date(date),
                            el.getBoundingClientRect().top
                          )}
                      >
                        <Subheader>
                          {dateIsToday(date) && 'Today'}
                          {new Date(date).toLocaleDateString()}
                        </Subheader>
                      </span>
                    </Paper>
                    <BookingsList
                      bookings={this.props.bookingsByDay[date] || []}
                    />
                  </Paper>
                )
                return all
              },
              [] as JSX.Element[]
            )}
        </div>
        <div
          style={{
            flex: 1,
            width: '100%',
            minHeight: 1000,
            height: '100%',
            overflow: 'hidden',
            background:
              'url(https://i.redd.it/bqjvrehhmkhz.jpg) no-repeat center center fixed',
            textAlign: 'center',
            color: 'white'
          }}
        >
          <h1>Look something cute to over scroll into</h1>
        </div>
      </div>
    )
  }
}

const BookingWrapperStyle = {
  padding: 10
}
class BookingsList extends React.PureComponent<{
  bookings: Booking[]
}> {
  render() {
    return this.props.bookings.map(
      booking =>
        booking && (
          <Paper style={BookingWrapperStyle} key={booking.id}>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  flex: 0,
                  flexDirection: 'column',
                  minWidth: 80,
                  alignItems: 'flex-start'
                }}
              >
                <div>
                  {pad(booking.start.getHours() + '', 2)}:{pad(booking.start.getMinutes() + '', 2)}
                </div>
                <div>
                  {pad(booking.end.getHours() + '', 2)}:{pad(booking.end.getMinutes() + '', 2)}
                </div>
                <div>{humanReadableDateDiff(booking.start, booking.end)}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div>{booking.eventName}</div>
                <div>{booking.roomName}</div>
              </div>
            </div>
          </Paper>
        )
    )
  }
}
