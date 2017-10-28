import * as React from 'react'
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
      <div style={style as any}>
        <img className="loadingSpinner" src={logo} />
      </div>
    )
  }
}
