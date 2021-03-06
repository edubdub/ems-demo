import * as React from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import FlatButton from 'material-ui/FlatButton'
import addMinutesToDate from '../../utils/date/addMinutesToDate'
import combineDateTimes from '../../utils/date/combineDateTimes'
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
const getDefaultState = () => {
  // time might roll over to the next day, so make the start/endDate match
  const startDate = new Date()
  const startTime = addMinutesToDate(startDate, 5)
  startDate.setDate(startTime.getDate())
  let endDate = new Date()
  let endTime = addMinutesToDate(endDate, 30)
  endDate.setDate(endTime.getDate())
  return {
    submitAttempted: false,
    initialized: false,
    name: '',
    room: '',
    valid: false,
    startDate,
    startTime,
    endDate,
    endTime,
    errors: {
      name: '',
      room: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: ''
    }
  }
}
interface IPropTypes {
  open: boolean
  onRequestClose: (val: boolean) => any
  onSubmit: (booking: Booking) => any
}
export default class Loading extends React.PureComponent<IPropTypes> {
  state = getDefaultState()

  // This is a modal that doesn't actually unmount when closed.
  // So we need to reset state when the modal is opened, not when the
  // component is mounted
  componentWillReceiveProps(nextProps: IPropTypes) {
    if (!this.props.open && nextProps.open) {
      this.setState(getDefaultState())
    }
  }
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
          start: combineDateTimes(this.state.startDate, this.state.startTime),
          end: combineDateTimes(this.state.endDate, this.state.endTime)
        })
      )
      this.notifyOfRequestClose()
      this.setState(getDefaultState())
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
  // TODO: This should be refactored / moved into the model, but it's got extra complications
  // because it's dealing with a date and time for start and end.

  // Ideally this would move, but since this is just a demo, I'm leaving it here
  validate = (state = this.state) => {
    const startTime = combineDateTimes(state.startDate, state.startTime)
    const startError =
      startTime.getTime() < new Date().getTime()
        ? 'You cannot schedule an event in the past'
        : ''

    const endTime = combineDateTimes(state.endDate, state.endTime)
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
    // TODO: not sure why this needs a timeout, should be investigated, I think it's because
    // of the load in animation.
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
              floatingLabelText="Start Date"
              value={this.state.startDate}
              onChange={this.setValue('startDate')}
              errorText={
                this.state.submitAttempted && this.state.errors.startDate
              }
            />
            <TimePicker
              id="startTime"
              floatingLabelText="Start Time"
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
              floatingLabelText="End Date"
              value={this.state.endDate}
              onChange={this.setValue('endDate')}
              errorText={
                this.state.submitAttempted && this.state.errors.endDate
              }
            />
            <TimePicker
              id="endTime"
              floatingLabelText="End Time"
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
