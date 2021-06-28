// このコードでは、Resource AとResource Bを順番に取得しています。 それぞれ取得したリソースを変数resultsに追加し、すべて取得し終わったらコンソールに出力します。

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

const results = [];
// Resource Aを取得する
dummyFetch("/resource/A")
  .then((response) => {
    console.log(1);

    console.log(response);
    console.log(2);

    results.push(response.body);
    // Resource Bを取得する
    return dummyFetch("/resource/B");
  })
  .then((response) => {
    results.push(response.body);
  })
  .then(() => {
    console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
  });
