export function getCurrentYear () {
  let d = new Date()
  let y = d.getFullYear()

  // Realease prompts October, 23
  if (d.getMonth() === 9 && d.getDate() >= 23) {
    return y
  }

  // Monthes before November, return previous year
  if (d.getMonth() < 10) {
    y--
  }

  return y
}

// Codevember is in November
export function isCodevemberMonth() {
  let d = new Date()
  return d.getMonth() === 10;
}