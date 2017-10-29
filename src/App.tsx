import * as React from 'react'
import './App.css'
import NavBar from './components/navBar/navBarContainer'
import BookingWithBookingData from './components/bookings/bookingsWithBookingData'
import AddBookingContainer from './components/addBooking/addBookingContainer'
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <BookingWithBookingData />
        <AddBookingContainer />
      </div>
    )
  }
}

export default App
