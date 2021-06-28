// コードを実行してみると、Async Function内でawaitしても、Async Function外の処理は停止していないことがわかります。

async function asyncMain() {
  // 中でawaitしても、Async Functionの外側の処理まで止まるわけではない
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 16);
  });
}

// 同期
console.log("1.asyncMainを呼ぶ");

// Async Functionは外から見れば単なるPromiseを返す関数
asyncMain().then(() => {
  // 非同期
  console.log("3. asyncMain関数が完了しました");
});

// Async Functionの外側の処理はそのまま進む
// 同期
console.log("2. asyncMain関数外では、次の行が同期的に呼び出される");
