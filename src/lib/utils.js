export function getCurrentYear () {
  let d = new Date()
  let y = d.getFullYear()

  // Realease prompts October, 30
  if (d.getMonth() === 9 && d.getDate() >= 30) {
    return y
  }

  // Monthes before November, return previous year
  if (d.getMonth() < 10) {
    y--
  }

  return y
}
