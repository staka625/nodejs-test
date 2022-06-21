class LRUCache extends Map {
  constructor(cachesize) {
    super();
    this.cachesize = cachesize;
  }

  set(key, value) {
    super.set(key, value);
  }
}

module.exports = LRUCache;
