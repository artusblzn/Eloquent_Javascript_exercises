/* A variant to 4-1 (The Sum of a Range) using the reduce method 
to sum the elements. */

function range(start, end, step = 1) {
  let numbers = [];

  for (
    let number = start;
    step > 0 ? number <= end : end <= number;
    number += step
  ) {
    numbers.push(number);
  }

  return numbers;
}

function sum(numbers) {
  return numbers.reduce((n1, n2) => n1 + n2);
}

console.log(sum(range(1, 10)));
console.log(range(1, 10, 2));
console.log(range(5, 2, -1));
