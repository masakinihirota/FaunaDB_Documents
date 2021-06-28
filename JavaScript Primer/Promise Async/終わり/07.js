/**
 * 1000ミリ秒未満のランダムなタイミングでレスポンスを疑似的にデータ取得する関数
 * 指定した`path`にデータがある場合は`callback(null, レスポンス)`を呼ぶ
 * 指定した`path`にデータがない場合は`callback(エラー)`を呼ぶ
 */

function dummyFetch(path, callback) {
  setTimeout(() => {
    // /successからはじまるパスにはリソースがある設定
    if (path.startsWith("/success")) {
      callback(null, { body: `Response body of ${path}` });
    } else {
      callback(new Error("NOT FOUND"));
    }
  }, 100 * Math.random());
}

// /success/data にリソースが存在するので、`response`にはデータが入る

dummyFetch("/success/data", (error, response) => {
  if (error) {
    //この行は実行されない
  } else {
    console.log(response);
    // => { body: "Response body of /success/data" }
  }
});

// /failure/data にリソースは存在しないので、`error`にはエラーオブジェクトが入る

dummyFetch("/failure/data", (error, response) => {
  if (error) {
    console.log(error.message);
  } else {
    // この行は実行されない
  }
});
