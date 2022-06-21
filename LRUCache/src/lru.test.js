const { expect } = require("expect");
const { beforeAll } = require("jest-circus");
const LRUCache = require("./lru");

test("要素を追加する", () => {
  /************** generate phase **************/
  const lru = new LRUCache(1); //キャッシュサイズ1で作成
  lru.set(1, 1); //[1,1]を追加
  console.log(lru); //確認のため表示({1 => 1}となるはず)

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

test("先頭のデータを削除する", () => {
  /************** generate phase **************/
  const lru = new LRUCache(2); //キャッシュサイズ1で作成
  lru.set(1, 1); //[1,1]を追加
  lru.set(2, 2); //[2,2]を追加
  lru.deleteFirstElement();
  console.log(lru); //確認のため表示({2 => 2}となるはず)

  /************** test phase **************/
  expect(lru.cachesize).toBe(2); //キャッシュサイズは1か？
  expect(lru.size).toBe(1); //サイズは1か？

  var i = 0;
  lru.forEach((key, val) => {
    switch (i) {
      case 0: //index-0番目のデータがkey,valともに2か？
        expect(key).toBe(2);
        expect(val).toBe(2);
        break;
    }
    i++;
  });
});

test("Cache の最大サイズに達したら最も使われていないデータを削除して追加する", () => {
  /************** generate phase **************/
  const lru = new LRUCache(2); //キャッシュサイズ1で作成
  lru.set(1, 1); //[1,1]を追加
  lru.set(2, 2); //[2,2]を追加
  lru.set(3, 3); //[3,3]を追加
  console.log(lru); //確認のため表示({2 => 2, 3 => 3}となるはず)

  /************** test phase **************/
  expect(lru.cachesize).toBe(2); //キャッシュサイズは1か？
  expect(lru.size).toBe(2); //サイズは2か？

  var i = 0;
  lru.forEach((key, val) => {
    switch (i) {
      case 0: //index-0番目のデータがkey,valともに2か？
        expect(key).toBe(2);
        expect(val).toBe(2);
        break;
      case 1: //index1番目のデータがkey,valともに3か？
        expect(key).toBe(3);
        expect(val).toBe(3);
        break;
    }
    i++;
  });
});
