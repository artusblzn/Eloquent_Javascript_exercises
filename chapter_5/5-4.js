/*
Dominant writing direction

Write a function that computes the dominant writing direction in a string of
text. Remember that each script object has a direction property that can be
"ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom).
The dominant direction is the direction of a majority of the characters that
have a script associated with them. The characterScript and countBy functions 
defined earlier in the chapter are probably useful here.
*/

let SCRIPTS = require("./scripts");

//Function given by the book
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

//Function given by the book
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex((c) => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function getDirectionByName(scriptName) {
  return SCRIPTS.find((script) => script.name == scriptName).direction;
}

function dominantDirection(text) {
  let totalsByScriptName = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({ name }) => name != "none");

  let totalsByDirection = [
    { direction: "ltr", count: 0 },
    { direction: "rtl", count: 0 },
    { direction: "ttb", count: 0 },
  ];

  for (let totalByScriptName of totalsByScriptName) {
    let direction = getDirectionByName(totalByScriptName.name);
    totalsByDirection.find(
      (totalByDirection) => totalByDirection.direction == direction
    ).count += totalByScriptName.count;
  }

  return totalsByDirection.reduce(
    (dominantDirection, direction) => {
      return dominantDirection.count > direction.count
        ? dominantDirection
        : direction;
    },
    { direction: "none", count: 0 }
  ).direction;
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
