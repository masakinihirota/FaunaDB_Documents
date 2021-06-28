// このコードでは、
// 指定したリソースのパスの配列を渡してそれらを順番に取得するfetchResources関数を実装しています。 Async Function内でfor文を使った反復処理を行い、forループの中でawait文を使ってリソースの取得を待ち、その結果を追加しています。

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

// 複数のリソースを順番に取得する
async function fetchResources(resources) {
  const results = [];
  for (let i = 0; i < resources.length; i++) {
    const resource = resources[i];
    // ループ内で非同期処理の完了を待っている
    const response = await dummyFetch(resource);
    results.push(response.body);
  }
  // 反復処理がすべて終わったら結果を返す(返り値となるPromiseを`results`でresolveする)
  return results;
}

// 取得したいリソースのパス配列
const resources = ["/resource/A", "/resource/B"];

// リソースを取得して出力する
fetchResources(resources).then((results) => {
  console.log(results);
});
