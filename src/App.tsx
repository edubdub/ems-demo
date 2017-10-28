import * as React from 'react'
import './App.css'
import NavBar from './components/navBar/navBarContainer'
import BookingWithBookingData from './components/bookings/bookingsWithBookingData'
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <BookingWithBookingData />
      </div>
    )
  }
}

export default App
