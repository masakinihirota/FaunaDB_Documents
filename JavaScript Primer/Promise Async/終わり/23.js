// Promiseチェーンを変数に入れた場合

const firstPromise = Promise.resolve();
const secondePromise = firstPromise.then(() => {
  console.log(1);
});

const thirdPromise = secondePromise.then(() => {
  console.log(2);
});

console.log(firstPromise === secondePromise);
console.log(secondePromise === thirdPromise);
