// Persistent group

// Most data structures provided in a standard JavaScript environment aren’t very well suited
// for persistent use. Arrays have slice and concat methods, which allow us to easily create new
// arrays without damaging the old one. But Set, for example, has no methods for creating a new set
// with an item added or removed.

// Write a new class PGroup, similar to the Group class from Chapter 6, which stores a set of values.
// Like Group, it has add, delete, and has methods.

// Its add method, however, should return a new PGroup instance with the given member added and leave
// the old one unchanged. Similarly, delete creates a new instance without a given member.

// The class should work for values of any type, not just strings. It does not have to be efficient when
// used with large amounts of values.

// The constructor shouldn’t be part of the class’s interface (though you’ll definitely want to use it
// internally). Instead, there is an empty instance, PGroup.empty, that can be used as a starting value.

// Why do you need only one PGroup.empty value, rather than having a function that creates a new, empty
// map every time?

class PGroup {
  //Got the snippet for private constructor from MDN Web Docs.
  static #isInternalConstructing = false;

  constructor() {
    if (!PGroup.#isInternalConstructing) {
      throw new TypeError("PGroup is not constructable");
    }
    PGroup.#isInternalConstructing = false;
    this.group = [];
  }

  static empty() {
    PGroup.#isInternalConstructing = true;
    return new PGroup();
  }

  add(value) {
    let newPGroup = { ...this };
    if (!this.has(value)) {
      newPGroup.group.push(value);
    }
    return newPGroup;
  }

  delete(value) {
    let newPGroup = { ...this };
    if (this.has(value)) {
      newPGroup.group.splice(newPGroup.group.indexOf(value), 1);
    }
    return newPGroup;
  }

  has(value) {
    return this.group.indexOf(value) > -1 ? true : false;
  }
}

//I don't think it is possible to add the empty property to a private
//constructor. So I changed empty to a function.
let a = PGroup.empty().add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false
