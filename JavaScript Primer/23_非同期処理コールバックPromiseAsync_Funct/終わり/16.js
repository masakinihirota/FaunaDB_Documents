// `resolve(42)`された`Promise`インスタンスを作成する

const fulfilledPromise = Promise.resolve(42);

fulfilledPromise.then((value) => {
  console.log(value);
});
