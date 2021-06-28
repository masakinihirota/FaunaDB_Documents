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
// リソースAとリソースBを順番に取得する
function fetchAB() {
  const results = [];
  return dummyFetch("/resource/A").then(response => {
      results.push(response.body);
      return dummyFetch("/resource/B");
  }).then(response => {
      results.push(response.body);
      return results;
  });
}
// リソースを取得して出力する
fetchAB().then((results) => {
  console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
});