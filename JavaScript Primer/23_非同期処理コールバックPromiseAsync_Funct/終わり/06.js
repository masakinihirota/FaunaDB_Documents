// 非同期処理の外
// setTimeoutの引数はコールバック関数
setTimeout(() => {
  // 非同期処理の中
  try {
    throw new Error("エラー");
  } catch (e) {
    console.log("エラーをキャッチできる");
  }
}, 10);

console.log("この行は実行される");
