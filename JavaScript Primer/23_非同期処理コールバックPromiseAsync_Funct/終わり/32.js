// finallyは必ず実行される

// `promise`にはResolvedまたはRejectedなPromiseインスタンスがランダムで入る
const promise = Math.random() < 0.5 ? Promise.resolve() : Promise.reject();
promise.then(() => {
    console.log("Promise#then");
  }).catch((error) => {
    console.log("Promise#catch");
  }).finally(() => {
    // 成功、失敗どちらの場合でも呼び出される
    console.log("Promise#finally");
  });