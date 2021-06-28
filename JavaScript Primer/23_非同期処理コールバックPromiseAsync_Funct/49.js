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

// 複数のリソースをまとめて取得する
async function fetchAllResources(resources) {
  // リソースを同時に取得する
  const promises = resources.map(function (resource) {
    return dummyFetch(resource);
  });

  // すべてのリソースが取得できるまで待つ
  // Promise.allは [ResponseA, ResponseB] のように結果が配列となる
  const responses = await Promise.all(promises);

  // 取得した結果からレスポンスのボディだけを取り出す
  return responses.map((response) => {
    return response.body;
  });
}

const resources = ["/resource/A", "/resource/B", "/resource/C", "/resource/D"];
// リソースを取得して出力する
fetchAllResources(resources).then((results) => {
  console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
});
