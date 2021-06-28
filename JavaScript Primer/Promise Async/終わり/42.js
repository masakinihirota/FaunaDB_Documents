// 1. resolveFnは値を返している
// 何もreturnしていない場合はundefinedを返したのと同じ扱いとなる

async function resolveFn() {
  return "返り値";
}

resolveFn().then((value) => {
  console.log(value); // => "返り値"
});

// 同期関数なので最初に実行される。
resolveFn().then(console.log("1"));
  
// 2. rejectFnはPromiseインスタンスを返している
async function rejectFn() {
  return Promise.reject(new Error("エラーメッセージ"));
}

// rejectFnはRejectedなPromiseを返すのでcatchできる
// .then()をいくつつなげても無視される
rejectFn().then().then().then().then().catch((error) => {
  console.log(error.message); // => "エラーメッセージ"
  // 下記でコールバック関数を投げている
// 非同期のコールバック関数
}).then(() => {console.log("2")});

// 3. exceptionFnは例外を投げている

async function exceptionFn() {
  throw new Error("例外が発生しました");
  // 例外が発生したため、この行は実行されません
}

// Async Functionで例外が発生するとRejectedなPromiseが返される

exceptionFn().catch((error) => {
  console.log(error.message); // => "例外が発生しました"
});
