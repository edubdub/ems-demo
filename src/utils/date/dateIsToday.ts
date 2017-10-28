export default (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  return date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
}
