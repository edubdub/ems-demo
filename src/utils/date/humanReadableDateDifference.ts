export default (d1: Date, d2: Date) => {
  const timeDiffInMs = Math.abs(d1.getTime() - d2.getTime())
  const timeDiffInHours = Math.floor(timeDiffInMs / 3600000)
  const minutesLeftover = Math.floor((timeDiffInMs % 3600000) / 60000)
  let timeLeftOver = []
  if (timeDiffInHours > 0) {
    timeLeftOver.push(timeDiffInHours + 'h')
  }
  if (minutesLeftover > 0) {
    timeLeftOver.push(minutesLeftover + 'm')
  }
  return timeLeftOver.join(' ')
}
