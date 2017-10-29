export default (str: string, len: number, padChar: string = '0') => {
  while (str.length < len) str = padChar + str
  return str
}
