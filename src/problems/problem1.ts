const solution = () => {
  console.time('problem1')
  const n = 1000
    let number = 0
    for (let i = 1; i < n; i++) {
      if (i % 3 === 0 && i % 5 !== 0) {
        number = number + i
      }
      if (i % 5 === 0) {
        number = number + i
      }
    }
  console.timeEnd('problem1')
  return number
}

const description = "If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23. \n" +
    "Find the sum of all the multiples of 3 or 5 below 1000."

const title = "Multiples of 3 and 5"

export { solution, description, title }
