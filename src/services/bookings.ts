import { Booking } from '../models/booking'
export function requestBookings(maxTimeInSeconds = 3): Promise<Booking[]> {
  const randomTimeInSeconds = Math.floor(Math.random() * 3) * 1000
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(data), randomTimeInSeconds)
  )
}

// since it's here, we might as well use it in our tests
export const data: Booking[] = [
  {
    id: 0,
    eventName: 'Test Booking 01',
    roomName: 'Demo Room 01',
    start: '2016-11-10T13:00:00.000Z',
    end: '2016-11-10T14:00:00.000Z'
  },
  {
    id: 1,
    eventName: 'Test Booking 02',
    roomName: 'Demo Room 02',
    start: '2016-11-10T13:00:00.000Z',
    end: '2016-11-10T14:00:00.000Z'
  },
  {
    id: 2,
    eventName: 'Test Booking 03',
    roomName: 'Demo Room 03',
    start: '2016-11-14T13:00:00.000Z',
    end: '2016-11-14T14:00:00.000Z'
  },
  {
    id: 3,
    eventName: 'Test Booking 04',
    roomName: 'Demo Room 04',
    start: '2016-11-15T15:00:00.000Z',
    end: '2016-11-15T16:00:00.000Z'
  },
  {
    id: 4,
    eventName: 'Test Booking 05',
    roomName: 'Demo Room 05',
    start: '2016-11-15T15:00:00.000Z',
    end: '2016-11-15T16:00:00.000Z'
  },
  {
    id: 5,
    eventName: 'Thanksgiving',
    roomName: 'Conference Room 1',
    start: '2016-11-24T00:00:00.000Z',
    end: '2016-11-24T23:59:59.999Z'
  }
].map((rawBooking) => new Booking({
  id: rawBooking.id,
  eventName: rawBooking.eventName,
  roomName: rawBooking.roomName,
  start: new Date(rawBooking.start),
  end: new Date(rawBooking.end)
}))
