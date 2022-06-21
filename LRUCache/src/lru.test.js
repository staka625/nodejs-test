const exp = require("constants");
const { expect } = require("expect");
const { beforeAll } = require("jest-circus");
const LRUCache = require("./lru");

test("要素を追加する", () => {
  /************** generate phase **************/
  const lru = new LRUCache(1); //キャッシュサイズ1で作成
  lru.put(1, 1); //[1,1]を追加
  console.log(lru); //確認のため表示({1 => 1}となるはず)

  /************** test phase **************/
  expect(lru.cachesize).toBe(1); //キャッシュサイズは1か？

  var i = 0;
  lru.forEach((val, key) => {
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
  lru.put(1, 1); //[1,1]を追加
  lru.put(2, 2); //[2,2]を追加
  lru.deleteFirstElement();
  console.log(lru); //確認のため表示({2 => 2}となるはず)

  /************** test phase **************/
  expect(lru.cachesize).toBe(2); //キャッシュサイズは1か？
  expect(lru.size).toBe(1); //サイズは1か？

  var i = 0;
  lru.forEach((val, key) => {
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
  lru.put(1, 1); //[1,1]を追加
  lru.put(2, 2); //[2,2]を追加
  lru.put(3, 3); //[3,3]を追加
  console.log(lru); //確認のため表示({2 => 2, 3 => 3}となるはず)

  /************** test phase **************/
  expect(lru.cachesize).toBe(2); //キャッシュサイズは1か？
  expect(lru.size).toBe(2); //サイズは2か？

  var i = 0;
  lru.forEach((val, key) => {
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

test("getの作成", () => {
  /************** generate phase **************/
  const lru = new LRUCache(2); //キャッシュサイズ2で作成
  lru.put(1, 1); //[1,1]を追加
  lru.put(2, 2); //[2,2]を追加
  const val = lru.get(2); //2が使われる
  console.log(lru); //確認のため表示

  /************** test phase **************/
  expect(lru.cachesize).toBe(2); //キャッシュサイズは1か？
  expect(lru.size).toBe(2); //サイズは2か？
  expect(val).toBe(2); //getした値は2か？

  var i = 0;
  lru.forEach((val, key) => {
    switch (i) {
      case 0: //index-0番目のデータがkey,valともに1か？
        expect(key).toBe(1);
        expect(val).toBe(1);
        break;
      case 1: //index1番目のデータがkey,valともに2か？
        expect(key).toBe(2);
        expect(val).toBe(2);
        break;
    }
    i++;
  });
});

test("get されたら使われたとみなす", () => {
  /************** generate phase **************/
  const lru = new LRUCache(2); //キャッシュサイズ2で作成
  lru.put(1, 1); //[1,1]を追加
  lru.put(2, 2); //[2,2]を追加
  lru.get(1); //1が使われる
  lru.put(3, 3); //[3,3]を追加(ここで[2,2]が先頭なので削除)
  console.log(lru); //確認のため表示({1 => 1, 3 => 3}となるはず)

  /************** test phase **************/
  expect(lru.cachesize).toBe(2); //キャッシュサイズは1か？
  expect(lru.size).toBe(2); //サイズは2か？

  var i = 0;
  lru.forEach((val, key) => {
    switch (i) {
      case 0: //index-0番目のデータがkey,valともに1か？
        expect(key).toBe(1);
        expect(val).toBe(1);
        break;
      case 1: //index1番目のデータがkey,valともに3か？
        expect(key).toBe(3);
        expect(val).toBe(3);
        break;
    }
    i++;
  });
});

test("存在しなければ null を返す", () => {
  /************** generate phase **************/
  const lru = new LRUCache(2); //キャッシュサイズ2で作成
  lru.put(1, 1); //[1,1]を追加
  lru.put(2, 2); //[2,2]を追加
  lru.get(1); //1が使われる
  lru.put(3, 3); //[3,3]を追加(ここで[2,2]が先頭なので削除)
  console.log(lru); //確認のため表示({1 => 1, 3 => 3}となるはず)

  /************** test phase **************/
  expect(lru.cachesize).toBe(2); //キャッシュサイズは1か？
  expect(lru.size).toBe(2); //サイズは2か？
  expect(lru.get(4)).toBe(null); //4は存在しない？

  var i = 0;
  lru.forEach((val, key) => {
    switch (i) {
      case 0: //index-0番目のデータがkey,valともに1か？
        expect(key).toBe(1);
        expect(val).toBe(1);
        break;
      case 1: //index1番目のデータがkey,valともに3か？
        expect(key).toBe(3);
        expect(val).toBe(3);
        break;
    }
    i++;
  });
});
