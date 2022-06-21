class LRUCache extends Map {
  constructor(cachesize) {
    super();
    this.cachesize = cachesize;
  }

  set(key, value) {
    super.set(key, value);
    if (this.size > this.cachesize) {
      this.deleteFirstElement();
    }
    return this;
  }

  //最初の要素を削除
  deleteFirstElement() {
    for (const elm of this) {
      this.delete(elm[0]);
      return elm;
    }
  }
}

module.exports = LRUCache;
