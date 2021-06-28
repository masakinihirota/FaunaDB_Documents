try {
  throw new Error("同期的なエラー");
} catch (e) {
  console.log("同期的なエラーをキャッチする");
}
console.log("この行は実行される");
