import * as React from 'react'
import Paper from 'material-ui/Paper'
const logo = require('../../images/ems-software.png')
const style = {
  textAlign: 'center',
  display: 'block',
  position: 'fixed',
  top: 100,
  left: '50%',
  transform: 'translateX(-50%)'
}
export default class Loading extends React.PureComponent {
  render() {
    return (
      <Paper style={style as any} circle>
        <img className="loadingSpinner" src={logo} />
      </Paper>
    )
  }
}
