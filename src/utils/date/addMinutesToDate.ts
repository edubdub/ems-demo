export default function addMinutes(initialDate: Date, minutes: number) {
  const minutesInMs = minutes * 60000
  return new Date(initialDate.getTime() + minutesInMs)
}
