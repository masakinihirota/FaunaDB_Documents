function blockTime(timeout) {
  const startTime = Date.now();
  while (true) {
    const diffTime = Date.now() - startTime;
    if (diffTime > timeout) {
      return;
    }
  }
}

console.log("処理開始");
blockTime(1000);
console.log("この行が呼ばれるまで処理がブロックされる");
