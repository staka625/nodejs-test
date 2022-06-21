class LRUCache extends Map {
  constructor(cachesize) {
    super();
    this.cachesize = cachesize;
  }

  put(key, value) {
    super.set(key, value);
    //キャッシュサイズ以上になれば
    if (this.size > this.cachesize) {
      this.deleteFirstElement(); //先頭のデータを削除する
    }
    return this;
  }

  get(key) {
    if (!this.has(key)) {
      return null;
    }
    const val = super.get(key);
    this.delete(key);
    super.set(key, val);
    return val;
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
