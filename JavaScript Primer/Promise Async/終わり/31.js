function main() {
  return Promise.reject(new Error("era-"));
}

// mainはRejectedなPromiseを返す
main()
  .catch((error) => {
    // asyncFunctionで発生したエラーのログを出力する
    console.log(error);
    // Promiseチェーンはそのままエラーを継続させる
    return Promise.reject(error);
  })
  // 一つ手前でPromiseインスタンスのerrorを返しているのでここでは関数は実行できない。
  .then(() => {
    // 前のcatchでRejectedなPromiseが返されたため、この行は実行されません
  })
  .catch((error) => {
    console.log("メインの処理が失敗した");
  });
