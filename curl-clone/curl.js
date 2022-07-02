import fetch from "node-fetch";
import * as fs from "fs";

var obj = {
  url: undefined,
  shouldBeVerbose: false,
  fileName: "",
  txt: "",
  option: "GET",
  body: undefined,
};

/*
 * 正規表現を用いて引数の文字列がURLかどうかを判定する関数
 *  - `?` は直前の文字が0 or 1回 -> `https?` で `http://`
 * か　`https://`のどちらかになる
 *  - `(|)`は`|`の前かあとのどちらかとなる
 *  - `[]+` でカッコ内の文字のいずれかが一文字以上
 *  - `\w` 英数字の集合
 */
function isURL(str) {
  const httpPattern = /(https?|ftp):\/\/[-_.!~*\'()\w;\/?:\@&=+\$,%#]+/g;
  return str.match(httpPattern) ? true : false;
}

/*
 * curlコマンドのクローン関数
 */
function curl() {
  for (let i = 0; i < process.argv.length; i++) {
    var arg = process.argv[i];
    if (arg === "-v") {
      obj.shouldBeVerbose = true;
    }
    if (arg === "-o") {
      if (i === process.argv.length) {
        throw "requires parameter";
      }
      obj.fileName = process.argv[i + 1];
      i++;
    }
    if (arg === "-X") {
      if (i === process.argv.length) {
        throw "requires parameter";
      }
      obj.option = process.argv[i + 1];
      i++;
    }
    if (arg === "-d") {
      if (i === process.argv.length) {
        throw "requires parameter";
      }
      if (obj.body === undefined) {
        obj.body = new URLSearchParams();
      }
      var arg1 = process.argv[i + 1];
      var keys = arg1.split("&");
      keys.forEach((key) => {
        var val = key.split("=", 2);
        obj.body.append(...val);
      });
      i++;
    }
    if (isURL(arg)) {
      obj.url = arg;
    }
  }

  if (!obj.url) {
    throw "no URL specified";
  }

  fetch(obj.url, {
    method: obj.option,
    body: obj.body,
  })
    .then((response) => {
      if (obj.shouldBeVerbose) {
        var txt = "type : " + response.type + "\n";
        txt += "url : " + response.url + "\n";
        txt += "redirected : " + response.redirected + "\n";
        txt +=
          "status : " + response.statusText + "(" + response.status + ")\n";
        txt += "header : {\n";
        for (let [key, value] of response.headers) {
          txt += "\t" + key + " : " + value + "\n";
        }
        txt += "}\n";
        obj.txt += txt;
        if (!obj.fileName) {
          console.log(txt);
        }
      }
      return response.text();
    })
    .then((data) => {
      obj.txt += data;
      if (obj.fileName) {
        fs.writeFileSync(obj.fileName, obj.txt);
      } else {
        console.log(data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function main() {
  try {
    curl();
  } catch (e) {
    console.error(e);
  }
}

main();
