import * as React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import beginningOfDay from '../../utils/date/beginningOfDay'
const style = {
  textAlign: 'center',
  display: 'block',
  position: 'fixed',
  bottom: 40,
  right: 40
}
const textStyle = {
  color: 'white'
}
export default class Loading extends React.PureComponent<{
  onPress: (date: Date) => any
}> {
  triggerNowPress = () => this.props.onPress(beginningOfDay(new Date()))
  render() {
    return (
      <FloatingActionButton
        onKeyPress={this.triggerNowPress}
        onClick={this.triggerNowPress}
        style={style as any}
      >
        <span style={textStyle}>Now</span>
      </FloatingActionButton>
    )
  }
}
