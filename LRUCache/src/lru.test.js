const { expect } = require("expect");
const { beforeAll } = require("jest-circus");
const LRUCache = require("./lru");

test("要素を追加する", () => {
  /************** generate phase **************/
  const lru = new LRUCache(1); //キャッシュサイズ1で作成
  lru.set(1, 1); //[1,1]を追加
  console.log(lru); //確認のため表示

  /************** test phase **************/
  expect(lru.cachesize).toBe(1); //キャッシュサイズは1か？

  var i = 0;
  lru.forEach((key, val) => {
    switch (i) {
      case 0: //index-0番目のデータがkey,valともに1か？
        expect(key).toBe(1);
        expect(val).toBe(1);
        break;
    }
    i++;
  });
});
