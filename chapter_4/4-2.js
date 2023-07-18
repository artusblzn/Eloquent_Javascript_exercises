/*
Reversing an array

Arrays have a reverse method that changes the array by inverting the order in
which its elements appear. For this exercise, write two functions, reverseArray
and reverseArrayInPlace. The first, reverseArray, takes an array as argument
and produces a new array that has the same elements in the inverse order. The
second, reverseArrayInPlace, does what the reverse method does: it modifies
the array given as argument by reversing its elements. Neither may use the
standard reverse method.

Thinking back to the notes about side effects and pure functions in the
previous chapter, which variant do you expect to be useful in more situations?
Which one runs faster?
*/

function reverseArray(array) {
  let reversedArray = [];
  for (const element of array) reversedArray.unshift(element);
  return reversedArray;
}

function reverseArrayInPlace(array) {
  /* 
  Here I used something called destructuring assignment.
  Read it here for more details: 
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  PS: C programmers will immediately think about pointers.
  */
  const swapElements = (index1, index2) => {
    [array[index1], array[index2]] = [array[index2], array[index1]];
  };

  // Swap the last and the first elements and so on.
  for (let i = 0; i < array.length / 2; i++) {
    swapElements(i, array.length - (i + 1));
  }
}

let array = [1, 2, 3, 4, 5, 6, 7];
console.log(reverseArray(array));
reverseArrayInPlace(array);
console.log(array);
