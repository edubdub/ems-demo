import * as React from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'

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
export default class Loading extends React.PureComponent<{
  open: boolean
  onRequestClose?: () => any
}> {
  render() {
    return (
      <Dialog
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <form>
          <h2 style={{ textAlign: 'right' }}>Add Event</h2>
          <div style={spaceBetweenStyle as any}>
            <TextField floatingLabelText="Event Name" />
            <TextField floatingLabelText="Event Room" />
          </div>
          <div style={spaceBetweenStyle as any}>
            <DatePicker hintText="Start Date" />
            <TimePicker format="24hr" hintText="Start Time" />
          </div>
          <div style={spaceBetweenStyle as any}>
            <DatePicker hintText="End Date" />
            <TimePicker format="24hr" hintText="End Time" />
          </div>
        </form>
      </Dialog>
    )
  }
}
