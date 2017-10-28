import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'
import { white } from 'material-ui/styles/colors'
const styles = {
  title: {
    cursor: 'pointer'
  }
}
export default class NavBar extends React.PureComponent<{ title?: string }> {
  render() {
    return (
      <AppBar
        title={<span style={styles.title}>{this.props.title}</span>}
        onTitleTouchTap={() => alert('works')}
        iconElementLeft={
          <IconButton>
            <NavigationClose />
          </IconButton>
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
    )
  }
}
