Promise.resolve()
  .then(() => {
    // 例外が発生すると、thenメソッドはRejectedなPromiseを返す
    throw new Error("例外");
  })
  .then(() => {
    // このthenのコールバック関数は呼び出されません
  })
  .catch((error) => {
    console.log(error.message); //=>例外
  })
  .then(() => {
      console.log(3);
      
    // このthenのコールバック関数は呼び出されません
  })
