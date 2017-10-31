export default (date: Date) => {
  const beginningOfDayForDate = new Date(date.getTime())
  beginningOfDayForDate.setHours(0)
  beginningOfDayForDate.setMinutes(0)
  beginningOfDayForDate.setSeconds(0)
  beginningOfDayForDate.setMilliseconds(0)
  return beginningOfDayForDate
}
