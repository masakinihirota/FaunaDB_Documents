function errorPromise(message) {
  return new Promise((resolve, reject) => {
    reject(new Error(message));
  });
}

// 非推奨: `then`メソッドで失敗時のコールバック関数だけを登録
errorPromise("thenでエラーハンドリング").then(undefined, (error) => {
  console.log(error.message); // => "thenでエラーハンドリング"
});

// 推奨: `catch`メソッドで失敗時のコールバック関数を登録
errorPromise("catchでエラーハンドリング").catch((error) => {
  console.log(error.message); // => "catchでエラーハンドリング"
});
