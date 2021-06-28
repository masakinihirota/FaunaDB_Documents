// Promiseチェーンをawait式で表現する
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

// リソースAとリソースBを順番に取得する

const results = [];
function fetchAB() {
  // 非同期のデータを取得してそれを入れる配列。
  return dummyFetch("/resource")
  // then メソッドで順番に取得している。
    .then((response) => {
      // 配列にpushコマンドで取得している。
      results.push(response.body);
      return dummyFetch("/resource");
    })
    .then((response) => {
      results.push(response.body);
      return results;
    });
}

// リソースを取得して出力する
fetchAB().then((results) => {
  // 返り値に取得したデータが入っている。
  console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
});

console.log(1);
// 同期関数なので最初に実行されてしまうので results はまだ空
console.log(results);
console.log(2
  );

  