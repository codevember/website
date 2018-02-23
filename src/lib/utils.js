export function getCurrentYear () {
  let d = new Date()
  let y = d.getFullYear()
  // Don't release current year before November, 1st
  if (d.getMonth() < 10) {
    y--
  }

  return y
}
