// 53.jsをログを付けて確認

function dummyFetch(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith("/resource")) {
        resolve({ body: `Response body of ${path}` });
      } else {
        reject(new Error("NOT FOUND"));
      }
    }, 1000 * Math.random());
  });
}

// リソースを順番に取得する
async function fetchResources(resources) {
  const results = [];
  console.log("1. fetchResourcesを開始");
  resources.forEach(async function (resource) {
    console.log(`2. ${resource}の取得開始`);
    const response = await dummyFetch(resource);
    // `dummyFetch`が完了するのは、`fetchResources`関数が返したPromiseが解決された後
    console.log(`5. ${resource}の取得完了`);
    results.push(response.body);
  });
  console.log("3. fetchResourcesを終了");
  return results;
}

const resources = ["/resource/A", "/resource/B"];
// リソースを取得して出力する
fetchResources(resources).then((results) => {
  console.log("4. fetchResourcesの結果を取得");
  console.log(results); // => []
});
