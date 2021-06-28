// `timeoutMs`ミリ秒後にresolveする
function delay(timeoutMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(timeoutMs);
    }, timeoutMs);
  });
}

// 1つでもresolveまたはrejectした時点で次の処理を呼び出す

const racePromise = Promise.race([delay(1), delay(32), delay(64), delay(128)]);

racePromise.then((value) => {
  // もっとも早く完了するのは1ミリ秒後
    console.log(value);

});
