function blockTime(timeout) {
  const startTime = Date.now();
  while (true) {
    const diffTime = Date.now() - startTime;
    if (diffTime > timeout) {
      return;
    }
  }
}

console.log("1.処理開始");
setTimeout(() => {
  console.log("3.ブロック処理の開始");
  blockTime(1000);
  console.log("4. ブロック処理が完了しました");
}, 10);

console.log("2. 同期的な処理を実行します。");
