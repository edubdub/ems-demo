import * as React from 'react'
import Card from 'material-ui/Card'
const logo = require('../../images/ems-software.png')
export default class Loading extends React.PureComponent {
  render() {
    return (
      <Card>
        <img className="loadingSpinner" src={logo} />
      </Card>
    )
  }
}
