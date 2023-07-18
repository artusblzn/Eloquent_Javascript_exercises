/* A variant solution the exercise 4-3 (A list) using classes, constructors
 and static functions. */

class Node {
  constructor(value) {
    this.value = value;
    this.rest = null;
  }
}

class List {
  constructor(node = null) {
    this.head = node;
  }

  prepend(node) {
    [this.head, node.rest = this] = [node, this.head];
  }

  /* To keep it recursive I had to create a new List out of the iteration head.
  I know it has not a good performance. */
  nth(index) {
    if (index == 0) return this.head;
    if (this.head.rest == undefined || index < 0) return undefined;
    return new List(this.head.rest).nth(index - 1);
  }

  isEmpty() {
    return this.head == null;
  }

  static arrayToList(array) {
    let list = new List();
    for (let element of array.reverse()) {
      let node = new Node(element);
      node.rest = list.head;
      list.head = node;
    }
    return list;
  }

  static listToArray(list) {
    let array = [];
    let node = list.head;
    while (node != null) {
      array.push(node.value);
      node = node.rest;
    }
    return array;
  }
}

let myList = List.arrayToList([1, 2, 3, 4, 5, 6]);
console.log(myList);
console.log(List.listToArray(myList));
myList.prepend(new Node(0));
console.log(myList);
console.log(myList.nth(2));
console.log(myList.nth(-1));
