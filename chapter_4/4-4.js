/* 
Deep comparison

The == operator compares objects by identity. But sometimes you’d prefer to
compare the values of their actual properties.

Write a function deepEqual that takes two values and returns true only if they
are the same value or are objects with the same properties, where the values
of the properties are equal when compared with a recursive call to deepEqual.
To find out whether values should be compared directly (use the === operator
for that) or have their properties compared, you can use the typeof operator.
If it produces "object" for both values, you should do a deep comparison.
But you have to take one silly exception into account: because of a historical
accident, typeof null also produces "object".
The Object.keys function will be useful when you need to go over the prop-
erties of objects to compare them.
*/

/* This function tests a lot of cases. Therefore, I created some auxiliary 
functions inside of it, to make it more readable */
function deepEqual(value1, value2) {
  const areBothNotObjects = () => {
    return typeof value1 != "object" || typeof value2 != "object";
  };

  const isAtLeastOneOfThemNull = () => value1 == null || value2 == null;

  const haveSameNumberofProperties = () => {
    return Object.keys(value1).length == Object.keys(value2).length;
  };

  if (areBothNotObjects() || isAtLeastOneOfThemNull()) {
    return value1 === value2;
  }

  if (haveSameNumberofProperties()) {
    for (let property of Object.keys(value1)) {
      if (Object.keys(value2).includes(property)) {
        if (!deepEqual(value1[property], value2[property])) {
          return false;
        }
      } else {
        return false;
      }
      return true;
    }
  }

  return false;
}

let value1 = 5;
let value2 = "5";
let value3 = 5;
let obj1 = { test: value1 };
let obj2 = { test: value2 };
let obj3 = { test: value3 };

console.log(deepEqual(value1, value2));
console.log(deepEqual(value1, value3));
console.log(deepEqual(obj1, obj1));
console.log(deepEqual(obj1, obj2));
console.log(deepEqual(obj1, obj3));
