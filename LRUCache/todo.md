# TODO

## テスト駆動開発での LRU キャッシュの実装

### テスト容易性:高/重要度:高

- [x] 要素を追加する
- [x] Cache の最大サイズに達したら最も使われていないデータを削除して追加する
  - [x] 最も使われていないデータを削除する
- [x] get されたら使われたとみなす
  - [x] とりあえず get を作成する
  - [x] 一度データを取り出してから，データを最後尾に追加する

### テスト容易性:低/重要度:低

- [x] 値を取り出すと，対応する値を返す
  - [x] 存在しなければ null を返す
