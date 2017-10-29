export default (
  start: number,
  end: number,
  duration: number,
  cb: (step: number) => any,
  fps: number = 60
) => {
  const goingBackwards = start > end
  const delta = end - start
  const stepCount = duration / fps
  const endTime = Date.now() + duration
  const stepSize = delta / stepCount
  let progress = start
  const pastEnd = (p: number) => (goingBackwards ? p < end : p > end)
  let cancelToken: number
  const step = () => {
    progress += stepSize
    if (pastEnd(progress) || endTime < Date.now()) {
      cb(end)
      cancelAnimationFrame(cancelToken)
    } else {
      cb(progress)
      cancelToken = requestAnimationFrame(step)
    }
  }
  cancelToken = requestAnimationFrame(step)
  return () => cancelAnimationFrame(cancelToken)
}
