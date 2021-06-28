// `timeoutMs`ミリ秒後にrejectする
function timeout(timeoutMs) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Timeout: ${timeoutMs}ミリ秒経過`));
    }, timeoutMs);
  });
}

function dummyFetch(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith("/resource")) {
        resolve({ body: `Response body of ${path}` });
      } else {
        reject(new Error("NOT FOUND"));
      }
    // 下記の計算で結果が変わる
    }, 1000 * Math.random());
  });
}
// 500ミリ秒以内に取得できなければ失敗時の処理が呼ばれる

Promise.race([dummyFetch("/resource/data"), timeout(500),])
  .then((response) => {
    console.log(response.body); // => "Response body of /resource/data"
  })
  .catch((error) => {
    console.log(error.message); // => "Timeout: 500ミリ秒経過"
  });
