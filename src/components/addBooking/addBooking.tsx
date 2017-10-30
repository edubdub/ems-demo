import * as React from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import FlatButton from 'material-ui/FlatButton'
import addMinutesToDate from '../../utils/date/addMinutesToDate'
import { Booking } from '../../models/booking'
// This is a pretty lazy style, there should be a subscription / width -> style HOC
const maxSizeForVerticalLayout = 742
const spaceBetweenStyle = {
  display: 'flex',
  flex: 1,
  flexDirection:
    window.innerWidth > maxSizeForVerticalLayout ? 'row' : 'column',
  justifyContent:
    window.innerWidth > maxSizeForVerticalLayout ? 'space-around' : 'center',
  marginTop: 10,
  marginBottom: 10
}
let idNonce = -1
const defaultState = {
  submitAttempted: false,
  initialized: false,
  name: '',
  room: '',
  valid: false,
  startDate: new Date(),
  startTime: addMinutesToDate(new Date(), 5),
  endDate: new Date(),
  endTime: addMinutesToDate(new Date(), 30),
  errors: {
    name: '',
    room: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: ''
  }
}
export default class Loading extends React.PureComponent<{
  open: boolean
  onRequestClose: (val: boolean) => any
  onSubmit: (booking: Booking) => any
}> {
  state = defaultState
  attemptSubmit = () => {
    this.setState({
      submitAttempted: true
    })
    const valid = this.validate()
    if (valid) {
      this.props.onSubmit(
        new Booking({
          id: idNonce--,
          eventName: this.state.name,
          roomName: this.state.room,
          start: this.combineDateTimes(
            this.state.startDate,
            this.state.startTime
          ),
          end: this.combineDateTimes(this.state.endDate, this.state.endTime)
        })
      )
      this.notifyOfRequestClose()
      this.setState(defaultState)
    }
  }
  setValue = (valueName: string) => (event: any, newValue: string | Date) => {
    const newState = {
      ...this.state,
      [valueName]: newValue
    }
    this.setState(newState)
    this.validate(newState)
  }
  // TODO: This should be made a util
  combineDateTimes = (date: Date, dateTime: Date) => {
    const combined = new Date(date.getTime())
    combined.setHours(dateTime.getHours())
    combined.setMinutes(dateTime.getMinutes())
    return combined
  }
  validate = (state = this.state) => {
    const startTime = this.combineDateTimes(state.startDate, state.startTime)
    const startError =
      startTime.getTime() < new Date().getTime()
        ? 'You cannot schedule an event in the past'
        : ''

    const endTime = this.combineDateTimes(state.endDate, state.endTime)
    const endError =
      endTime.getTime() < startTime.getTime()
        ? 'The event must end after it starts'
        : ''
    const errors = {
      name: !state.name.length ? 'event name is required' : '',
      room: !state.room.length ? 'event room is required' : '',
      startDate: startError,
      startTime: startError,
      endDate: endError,
      endTime: endError
    }
    const valid = !Object.keys(errors).find(key => errors[key].length > 0)
    this.setState({ errors, valid })
    return valid
  }
  notifyOfRequestClose = () => this.props.onRequestClose(false)
  focusOnStart = (tf: TextField) => {
    // TODO: not sure why this needs a timeout, should be investigated
    if (!this.state.initialized && tf) {
      setTimeout(() => tf.focus(), 100)
      this.setState({
        initialized: true
      })
    }
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.notifyOfRequestClose}
        onKeyPress={this.notifyOfRequestClose}
      />,
      <FlatButton
        disabled={this.state.submitAttempted && !this.state.valid}
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.attemptSubmit}
        onKeyPress={this.attemptSubmit}
      />
    ]
    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.notifyOfRequestClose}
      >
        <form onSubmit={this.attemptSubmit}>
          <h2 style={{ textAlign: 'center' }}>Add Event</h2>
          <div style={spaceBetweenStyle as any}>
            <TextField
              ref={this.focusOnStart}
              id="eventName"
              floatingLabelText="Event Name"
              value={this.state.name}
              onChange={this.setValue('name')}
              errorText={this.state.submitAttempted && this.state.errors.name}
            />
            <TextField
              id="roomName"
              floatingLabelText="Event Room"
              value={this.state.room}
              onChange={this.setValue('room')}
              errorText={this.state.submitAttempted && this.state.errors.room}
            />
          </div>
          <div style={spaceBetweenStyle as any}>
            <DatePicker
              id="startDate"
              hintText="Start Date"
              value={this.state.startDate}
              onChange={this.setValue('startDate')}
              errorText={
                this.state.submitAttempted && this.state.errors.startDate
              }
            />
            <TimePicker
              id="startTime"
              hintText="Start Time"
              value={this.state.startTime}
              onChange={this.setValue('startTime')}
              errorText={
                this.state.submitAttempted && this.state.errors.startTime
              }
            />
          </div>
          <div style={spaceBetweenStyle as any}>
            <DatePicker
              id="endDate"
              hintText="End Date"
              value={this.state.endDate}
              onChange={this.setValue('endDate')}
              errorText={
                this.state.submitAttempted && this.state.errors.endDate
              }
            />
            <TimePicker
              id="endTime"
              hintText="End Time"
              value={this.state.endTime}
              onChange={this.setValue('endTime')}
              errorText={
                this.state.submitAttempted && this.state.errors.endTime
              }
            />
          </div>
        </form>
      </Dialog>
    )
  }
}
