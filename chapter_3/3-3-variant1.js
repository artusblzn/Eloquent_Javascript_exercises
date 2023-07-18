/*
This is the same 3-3 (Bean Counting) exercise, but I created a solution with 
filter function.
*/

function countChar(string, character) {
  return string.split("").filter((s) => s == character).length;
}

function countBs(string) {
  return countChar(string, "B");
}

console.log(countBs("BlahBlahBlah"));
