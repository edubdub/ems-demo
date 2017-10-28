import * as React from 'react'
import './App.css'
import NavBar from './containers/navBar/navBarContainer'
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <i className="fa fa-plus fa-lg" />
      </div>
    )
  }
}

export default App
