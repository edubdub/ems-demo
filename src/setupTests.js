// this is in js because typescript won't let you do this
const constantDate = new Date('2017-06-13T04:41:20')

Date = class extends Date {
  constructor() {
    return constantDate
  }
}
