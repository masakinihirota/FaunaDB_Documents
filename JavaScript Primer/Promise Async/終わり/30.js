Promise.resolve()
  .then(function onFulfilledA() {
    console.log(1);
    return Promise.reject(new Error("Error"));
  })
  .then(function onFulfilledB() {
    console.log(2);

    console.log("onFulfilledBは呼び出されません");
  })
  .catch(function onRejected(error) {
    console.log(3);
    console.log(error.message); // 失敗
    console.log(4);
  })
  .catch(function onRejected(error) {
    // 一つ前でrejectを経たのでここは実行されない。        
    console.log(5);
    console.log(error.message); // 失敗
    console.log(6);
  })
  .then(function onFulfilledC() {
    console.log("onFulfilledCは呼び出されます。");
  });
