function blockTime(timeout) {
  const startTime = Date.now();
  while (true) {
    const diffTime = Date.now() - startTime;
    if (diffTime > timeout) {
      return;
    }
  }
}

// 同期処理が最初に呼ばれて、
// 非同期処理が後で処理される。

const startTime = Date.now();
setTimeout(() => {
  const endTime = Date.now();
  console.log(
    `非同期処理のコールバックが呼ばれるまで${
      endTime - startTime
    }ミリ秒かかりました`
  );
  // こちらの数字は関係ない
  // 非同期処理が呼ばれるまでだから
  // 最後にこの時間が立ったら結果が表示される
}, 10000);
console.log("ブロック処理の開始");
blockTime(1000);
console.log("ブロック処理が完了しました");
