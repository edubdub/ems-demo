import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import { white } from 'material-ui/styles/colors'
import DatePicker from 'material-ui/DatePicker'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
export default class NavBar extends React.PureComponent<{
  height: number
  date: Date
  searchTerm: string
  fuzzySearch: boolean
  heightRealized: (height: number) => any
  onDateChange: (date: Date) => any
  onSearchTermChange: (term: string) => any
  onFuzzySearchChange: (value: boolean) => any
}> {
  state = {
    searchMode: false
  }
  // blur and clicking x can happen at the same time
  switchToDateMode = () => this.setState({ searchMode: false })
  switchToSearchMode = () => this.setState({ searchMode: true })
  heightRendered = (e: HTMLDivElement) =>
    e && this.props.heightRealized(e.getBoundingClientRect().height)
  notifyOfDateChange = (e: any, date: Date) => this.props.onDateChange(date)
  notifyOfSearchTermChange = (e: any, value: string) =>
    this.props.onSearchTermChange(value)
  notifyOfFuzzySearchChange = () =>
    this.props.onFuzzySearchChange(!this.props.fuzzySearch)
  render() {
    return (
      <div style={{ height: this.props.height }}>
        <div
          style={{ position: 'fixed', width: '100%' }}
          ref={this.heightRendered}
        >
          <AppBar
            iconElementLeft={
              <div style={{ height: '100%', maxWidth: 50 }}>
                {this.state.searchMode ? (
                  <IconMenu
                    iconButtonElement={
                      <IconButton>
                        <MoreVertIcon color={'white'} />
                      </IconButton>
                    }
                    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                  >
                    <MenuItem
                      primaryText="Fuzzy Search"
                      leftIcon={
                        this.props.fuzzySearch ? (
                          <FontIcon className="fa fa-check" />
                        ) : (
                          <span />
                        )
                      }
                      onClick={this.notifyOfFuzzySearchChange}
                    />
                  </IconMenu>
                ) : (
                  <DatePicker
                    inputStyle={{ color: 'white' }}
                    value={this.props.date}
                    mode="landscape"
                    id="calendarNav"
                    container="inline"
                    onChange={this.notifyOfDateChange}
                  />
                )}
              </div>
            }
            title={
              this.state.searchMode && (
                <TextField
                  onChange={this.notifyOfSearchTermChange}
                  value={this.props.searchTerm}
                  hintText="Search for titles or rooms"
                  hintStyle={{ color: 'rgba(255, 255, 255, .3)' }}
                  inputStyle={{ color: 'white' }}
                  ref={tf => tf && tf.focus && tf.focus()}
                  id="mainSearch"
                />
              )
            }
            iconElementRight={
              <span>
                <FlatButton
                  onClick={
                    this.state.searchMode
                      ? this.switchToDateMode
                      : this.switchToSearchMode
                  }
                  onKeyPress={
                    this.state.searchMode
                      ? this.switchToDateMode
                      : this.switchToSearchMode
                  }
                  style={{ height: '100%' }}
                  label={
                    <FontIcon
                      color={white}
                      className={`fa fa-${this.state.searchMode
                        ? 'times'
                        : 'search'}`}
                    />
                  }
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
