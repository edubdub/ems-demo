import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import { white } from 'material-ui/styles/colors'
import DatePicker from 'material-ui/DatePicker'

export default class NavBar extends React.PureComponent<{
  height: number
  heightRealized: (height?: number) => any
  onDateChange: (date: Date) => any
  date: Date
}> {
  static get defaultProps() {
    return {
      height: 64
    }
  }
  heightRendered = (e: HTMLDivElement) =>
    // there seems to be some padding height coming from somewhere,
    // not going to try to figure it out now though
    e && this.props.heightRealized(e.getBoundingClientRect().height + 13)
  notifyOfDateChange = (e: any, date: Date) => this.props.onDateChange(date)
  render() {
    return (
      <div style={{ height: this.props.height }}>
        <div
          style={{ position: 'fixed', width: '100%' }}
          ref={this.heightRendered}
        >
          <AppBar
            iconElementLeft={
              <DatePicker
                value={this.props.date}
                mode="landscape"
                id="calendarNav"
                container="inline"
                onChange={this.notifyOfDateChange}
              />
            }
            iconElementRight={
              <span>
                <FlatButton
                  style={{ height: '100%' }}
                  label={<FontIcon color={white} className="fa fa-search" />}
                />
                <FlatButton
                  style={{ height: '100%' }}
                  label={<FontIcon color={white} className="fa fa-plus" />}
                />
              </span>
            }
          />
        </div>
      </div>
    )
  }
}
