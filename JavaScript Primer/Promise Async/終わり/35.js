// `timeoutMs`ミリ秒後にresolveする

function delay(timeoutMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(timeoutMs);
    }, timeoutMs);
  });
}

const answer = [];
const promise1 = delay(1);
promise1.then((result) => console.log(result));

// console.log();では<pending>となって中身が見えない
// console.log(promise1); //Promise { <pending> }

const promise2 = delay(2);
promise2.then((result) => console.log(result));
const promise3 = delay(3);
promise3.then((result) => console.log(result));

Promise.all([promise1, promise2, promise3])
  .then(function (values) {
    console.log(values); // => [1, 2, 3]
    console.log("Promise.all end");
    return values;
  })
  .then((ans) => {
    answer.push(ans);
    console.log(answer[0]);
  });

// 同期処理が先に終わる。
console.log("a");
// 非同期処理はこの後に表示される。
