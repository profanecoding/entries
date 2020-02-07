// Read the blog

const createNode = (key, value) => {
  return {
    next: null, // reference to the next node
    previous: null, // reference to the previous node
    key: key, // the fucking key
    value: value // the value of the fucking key
  }
}

class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this._head = null
    this._tail = null
    this._capacity = capacity
    this._nodeMap = {}
    this._size = 0
  }
  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    let oldNode = this._nodeMap[key]
    if (oldNode) {
      oldNode.value = value
      this._remove(oldNode)
      this._setHead(oldNode)
    } else {
      let newNode = createNode(key, value)
      if (this._size >= this._capacity) {
        delete this._nodeMap[this._tail.key]
        this._remove(this._tail)
        this._size -= 1
      }
      this._setHead(newNode)
      this._nodeMap[key] = newNode
    }
  }
  /**
   * @param {number} capacity
   */
  get(key) {
    let node = this._nodeMap[key]
    if (node) {
      this._remove(node)
      this._setHead(node)
      return node.value
    }
    return -1
  }
  keys() {
    let keys = []
    let node = this._head
    while (node) {
      keys.push(node.key)
      node = node.next
    }
    return keys
  }
  clear() {
    this._head = null
    this._tail = null
    this._nodeMap = {}
    this._size = 0
  }
  size() {
    return this._size
  }
  _setHead(node) {
    node.next = this._head
    node.previous = null
    if (this._head) {
      this._head.previous = node
    }
    this._head = node
    if (!this._tail) {
      this._tail = this._head
    }
  }
  _remove(node) {
    if (node.previous) {
      node.previous.next = node.next
    } else {
      this._head = node.next
    }
    if (node.next) {
      node.next.previous = node.previous
    } else {
      this._tail = node.previous
    }
  }
}
