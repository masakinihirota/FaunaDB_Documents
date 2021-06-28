// Promiseと例外
function throwPromise() {
  return new Promise((resolve, reject) => {
    // Promiseコンストラクタの中で例外は自動的にキャッチされrejectを呼ぶ
    throw new Error("例外が発生");

    // 例外が発生すると、これ以降のコンストラクタの処理は実行されません
  });
}

throwPromise().catch((error) => {
  console.log(error.message); // => "例外が発生"
});
