import { Record } from 'immutable'
const beginningOfTime = ' 2017-10-27T18:08:37Z'
export interface IBookingParams {
  id: number
  eventName: string
  roomName: string
  start: Date
  end: Date
}
export class Booking extends Record({
  id: -1,
  eventName: '',
  roomName: '',
  start: new Date(beginningOfTime),
  end: new Date(beginningOfTime)
}) {
  id: number
  eventName: string
  roomName: string
  start: Date
  end: Date
  constructor(params?: IBookingParams) {
    params ? super(params) : super()
  }
}
