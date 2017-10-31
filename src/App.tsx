import * as React from 'react'
import './App.css'
import NavBar from './components/navBar/navBarContainer'
import BookingWithBookingData from './components/bookings/bookingsWithBookingData'
import AddBookingContainer from './components/addBooking/addBookingContainer'
import NowButtonContainer from './components/now/nowContainer'
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <BookingWithBookingData />
        <AddBookingContainer />
        <NowButtonContainer />
      </div>
    )
  }
}

export default App
