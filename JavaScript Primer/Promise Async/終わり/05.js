try {
  setTimeout(() => {
    throw new Error("同期的なエラー");
  }, 10);
} catch (e) {
  // 非同期エラーはキャッチできないのでこの行は表示されない
  console.log("同期的なエラーをキャッチする");
}
console.log("この行は実行される");
