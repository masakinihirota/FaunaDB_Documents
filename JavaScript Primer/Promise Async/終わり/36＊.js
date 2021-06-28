function dummyFetch(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith("/resource")) {
        resolve({ body: `Response body of ${path}` });
      } else {
        reject(new Error("NOT FOUND"));
      }
    }, 100 * Math.random());
  });
}

const fetchedPromise = Promise.all([
  dummyFetch("/resource/A"),
  dummyFetch("/resource/B"),
]);

// 返り値はPromiseインスタンスであることが確認できる。
// このPromiseインスタンスは新しいPromiseインスタンス
console.log(fetchedPromise);

// しかしこのままでは取得した値は使えない。
// .thenメソッドを使って取り出す。

// fetchedPromise.then
// .thenメソッドはPromise オブジェクトに渡されたコールバック関数の処理結果を取得するインスタンスメソッドです。

// then() メソッドを使用すると、 Promise に渡されたコールバック関数の処理結果を受け取ることができます。

// 逆を言えば非同期処理のPromiseの処理結果はthenメソッドを使わないと取り出せない。


// fetchedPromiseの結果をDestructuringでresponseA, responseBに代入している

// Destructuring
// 分割代入のこと

// ここでは [responseA, responseB]という仮引数に
// fetchedPromiseの返り値がまとめて代入されている。

fetchedPromise.then(([responseA, responseB]) => {
  console.log(responseA.body);
  console.log(responseB.body);
});

// 同期処理が先に終わる。
console.log("a");
