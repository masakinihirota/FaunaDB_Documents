// `Promise`インスタンスを作成
const promise = new Promise((resolve, reject) => {
  // 非同期の処理が成功したときはresolve()を呼ぶ
  // 非同期の処理が失敗したときにはreject()を呼ぶ
});

// コールバック関数 成功時
const onFulfilled = () => {
  console.log("resolveのとき呼ばれる");
};

// コールバック関数 失敗時
const onRejected = () => {
  console.log("resolveのとき呼ばれる");
};

// `then`メソッドで成功時と失敗時に呼ばれるコールバック関数を登録

promise.then(onFulfilled, onRejected);
