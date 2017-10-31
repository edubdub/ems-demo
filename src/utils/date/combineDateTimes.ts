export default (date: Date, dateTime: Date) => {
  const combined = new Date(date.getTime())
  combined.setHours(dateTime.getHours())
  combined.setMinutes(dateTime.getMinutes())
  return combined
}
