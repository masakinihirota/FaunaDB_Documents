const fs = require("fs");

function foo() {
  fs.readFile("./readFile.txt", (err, data) => {
    //   エラーが出た場合の1行で処理
    if (err) throw err;
    // コールバック関数
    console.log({ data });
  });
  // 最初に実行される
  console.log(1);
}

foo();
