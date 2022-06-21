class LRUCache extends Map {
  constructor(cachesize) {
    super();
    this.cachesize = cachesize;
  }

  set(key, value) {
    super.set(key, value);
    //キャッシュサイズ以上になれば
    if (this.size > this.cachesize) {
      this.deleteFirstElement(); //先頭のデータを削除する
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
