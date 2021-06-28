async function asyncMain() {
  const value = await Promise.resolve(42);
  console.log(value); // => 42
  console.log(value); // => 42
}

asyncMain();

// これはPromiseを使って書くと次のコードと同様の意味となります。

// await式を使うことでコールバック関数を使わずに非同期処理の流れを表現できていることがわかります。

function asyncMain2() {
  return Promise.resolve(53).then((value) => {
    console.log(value); // => 53
    console.log(value); // => 53
  });
}

asyncMain2();  // Promiseインスタンスを返す。



