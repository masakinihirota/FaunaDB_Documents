// 同様の処理をAsync Functionとawait式で書くと次のように書けます。

// 46.jsをAsyncで書く。

function dummyFetch(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith("/resource")) {
        resolve({ body: `Response body of ${path}` });
      } else {
        reject(new Error("NOT FOUND"));
      }
    }, 1000 * Math.random);
  });
}

// リソースAとリソースBを順番に取得する

async function fetchAB() {
  const results = [];
  // チェーン化していないので
  const responseA = await dummyFetch("/resource/A");
  results.push(responseA.body);
  // 並べてあるだけ。
  const responseB = await dummyFetch("/resource/B");
  results.push(responseB.body);
  return results;
}

// リソースを取得して出力する
fetchAB().then((results) => {
  console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
});
