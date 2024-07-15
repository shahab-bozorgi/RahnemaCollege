class Node {
  constructor(value, next = null) {
      this.value = value;
      this.next = next;
  }
}




class LinkedList {
  constructor() {
      this.head = null;
  }


  insert(value) {
      const newNode = new Node(value, this.head);
      this.head = newNode;
  }

  insertLast(value) {
      const newNode = new Node(value);

      if (this.head === null) {
          this.head = newNode;
      } else {
          let current = this.head;
          while (current.next !== null) {
              current = current.next;
          }
          current.next = newNode;
      }
  }

  size() {
      let count = 0;
      let current = this.head;

      while (current !== null) {
          count++;
          current = current.next;
      }
      return count;
  }


  at(index) {
    let current = this.head;
    let count = 0;

    while (current) {
      if (count === index) {
        return current;
      }
      count++;
      current = current.next;
    }
    return null;
  }
 

  join(separator) {
    let result = '';
    let current = this.head;

    while (current) {
      result += current.value;
      if (current.next) {
        result += separator;
      }
      current = current.next;
    }
    return result;
  }




  map(func) {
      let current = this.head;
      const newList = new LinkedList();

      while (current !== null) {
        newList.insertLast(func(current.value));
        current = current.next;
      }
      return newList;
  }


  filter(func) {
      let current = this.head;
      const newList = new LinkedList();

      while (current !== null) {
          if (func(current.value)) {
              newList.insertLast(current.value);
          }
          current = current.next;
      }
      return newList;
  }

  find(callback) {
    let current = this.head;
    while (current) {
      if (callback(current.value)) {
        return current;
      }
      current = current.next;
    }
    return null;
  }
}

