非同期処理は処理の流れが
同期処理とは異なる

# エラーファーストコールバック

処理が失敗した場合は、コールバック関数の 1 番目の引数にエラーオブジェクトを渡して呼び出す

処理が成功した場合は、コールバック関数の 1 番目の引数には null を渡し、2 番目以降の引数に成功時の結果を渡して呼び出す

ひとつのコールバック関数で失敗した場合と成功した場合の両方を扱うルールとなります。

例
asyncTask 関数はエラーファーストコールバックを受け取る

```
asyncTask((error, result) => {
    if (error) {
        // 非同期処理が失敗したときの処理
    } else {
        // 非同期処理が成功したときの処理
    }
});
```

# [ES2015] Promise

Promise では、非同期処理に
成功したときの処理をコールバック関数として then メソッドへ渡し、
失敗したときの処理を同じくコールバック関数として catch メソッドへ渡します。

// asyncPromiseTask 関数は Promise インスタンスを返す

```
asyncPromiseTask().then(()=> {
    // 非同期処理が成功したときの処理
}).catch(() => {
    // 非同期処理が失敗したときの処理
});
```

# Promise インスタンスの作成

Promise は new 演算子で Promise のインスタンスを作成して利用します。

このときのコンストラクタには resolve と reject の 2 つの引数を取る executor と呼ばれる関数を渡します。

executor 関数の中で非同期処理を行い、
非同期処理が成功した場合は resolve 関数を呼び、
失敗した場合は reject 関数を呼び出します。

resolve
reject

```
const executor = (resolve, reject) => {
    // 非同期の処理が成功したときはresolveを呼ぶ
    // 非同期の処理が失敗したときはrejectを呼ぶ
};
const promise = new Promise(executor);
```

then メソッドのエイリアスでもある catch メソッド

# Promise の状態

Promise の then メソッドや catch メソッドによる処理がわかったところで、Promise インスタンスの状態について整理していきます。

Promise インスタンスには、内部的に次の 3 つの状態が存在します。

Fulfilled
resolve（成功）したときの状態。このとき onFulfilled が呼ばれる
Rejected
reject（失敗）または例外が発生したときの状態。このとき onRejected が呼ばれる
Pending
Fulfilled または Rejected ではない状態
new Promise でインスタンスを作成したときの初期状態

この状態を Promise のインスタンスから取り出す方法はありません。

Promise インスタンスの状態は作成時に Pending となり、一度でも Fulfilled または Rejected へ変化すると、それ以降状態は変化しなくなります。 そのため、Fulfilled または Rejected の状態であることを Settled（不変）と呼びます。

一度でも Settled（Fulfilled または Rejected）となった Promise インスタンスは、それ以降別の状態には変化しません。 そのため、resolve を呼び出した後に reject を呼び出しても、その Promise インスタンスは最初に呼び出した resolve によって Fulfilled のままとなります。

Promise インスタンスの状態が変化したときに、一度だけ呼ばれるコールバック関数を登録するのが then や catch メソッドとなります。

# Promise.resolve

Promise.resolve メソッドは Fulfilled の状態となった Promise インスタンスを作成します。

```
const fulfilledPromise = Promise.resolve();
```

Promise.resolve メソッドは new Promise の糖衣構文（シンタックスシュガー）です。

```
// const fulfilledPromise = Promise.resolve(); と同じ意味
const fulfilledPromise = new Promise((resolve) => {
    resolve();
});
```

# Promise チェーン

Promise ではこのような複数の非同期処理からなる一連の非同期処理を簡単に書く方法が用意されています。

この仕組みのキーとなるのが then や catch メソッドは常に新しい Promise インスタンスを作成して返すという仕様です。

# Promise チェーンで値を返す

# コールバック関数で Promise インスタンスを返す

Promise チェーンで一度キャッチすると、次に呼ばれるのは成功時の処理（then メソッド）でした。 これは、コールバック関数で任意の値を返すと、その値で resolve された Fulfilled 状態の Promise インスタンスを作成するためです。

コールバック関数で Promise インスタンスを返した場合は、同じ状態を持つ Promise インスタンスが then や catch メソッドの返り値となります。 つまり then メソッドで Rejected 状態の Promise インスタンスを返した場合は、次に呼ばれるのは失敗時の処理です。

# [ES2018] Promise チェーンの最後に処理を書く

Promise#finally メソッドは成功時、失敗時どちらの場合でも呼び出されるコールバック関数を登録できます。 try...catch...finally 構文の finally 節と同様の役割を持つメソッドです。

# Promise チェーンで逐次処理

Promise チェーンで非同期処理の流れを書く大きなメリットは、非同期処理のさまざまなパターンに対応できることです。

Promise で逐次的な処理といっても難しいことはなく、単純に then で非同期処理をつないでいくだけです。

```36＊.js
function dummyFetch(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith("/resource")) {
        resolve({ body: `Response body of ${path}` });
      } else {
        reject(new Error("NOT FOUND"));
      }
    }, 100 * Math.random());
  });
}

const fetchedPromise = Promise.all([
  dummyFetch("/resource/A"),
  dummyFetch("/resource/B"),
]);

// 返り値はPromiseインスタンスであることが確認できる。
// このPromiseインスタンスは新しいPromiseインスタンス
console.log(fetchedPromise);

// しかしこのままでは取得した値は使えない。
// .thenメソッドを使って取り出す。

// fetchedPromise.then
// .thenメソッドはPromise オブジェクトに渡されたコールバック関数の処理結果を取得するインスタンスメソッドです。

// then() メソッドを使用すると、 Promise に渡されたコールバック関数の処理結果を受け取ることができます。

// 逆を言えば非同期処理のPromiseの処理結果はthenメソッドを使わないと取り出せない。


// fetchedPromiseの結果をDestructuringでresponseA, responseBに代入している

// Destructuring
// 分割代入のこと

// ここでは [responseA, responseB]という仮引数に
// fetchedPromiseの返り値がまとめて代入されている。

fetchedPromise.then(([responseA, responseB]) => {
  console.log(responseA.body);
  console.log(responseB.body);
});

// 同期処理が先に終わる。
console.log("a");

```

# Promise.race

複数の Promise を受け取りますが、Promise が 1 つでも完了した（Settled 状態となった）時点で次の処理を実行します。

配列の中で一番最初に Settled となった Promise が Fulfilled の場合は、新しい Promise インスタンスも Fulfilled になる
配列の中で一番最初に Settled となった Promise が Rejected の場合は、新しい Promise インスタンスも Rejected になる

つまり、複数の Promise による非同期処理を同時に実行して競争（race）させて、一番最初に完了した Promise インスタンスに対する次の処理を呼び出します。

Promise インスタンスは一度 Settled（Fulfilled または Rejected）となると、それ以降は状態も変化せず then のコールバック関数も呼び出しません。

Promise.race メソッドを使うことで Promise を使った非同期処理のタイムアウトが実装できます。 ここでのタイムアウトとは、一定時間経過しても処理が終わっていないならエラーとして扱う処理のことです。

次のコードでは timeout 関数と dummyFetch 関数が返す Promise インスタンスを Promise.race メソッドで競争させています。 dummyFetch 関数ではランダムな時間をかけてリソースを取得し resolve する Promise インスタンスを返します。 timeout 関数は指定ミリ秒経過すると reject する Promise インスタンスを返します。

この 2 つの Promise インスタンスを競争させて、dummyFetch が先に完了すれば処理は成功、timeout が先に完了すれば処理は失敗というタイムアウト処理が実現できます。

# [ES2017] Async Function

Async Function は通常の関数とは異なり、必ず Promise インスタンスを返す関数を定義する構文です。

Async Function は次のように関数の前に async をつけることで定義できます。

Async Function 内では await 式という Promise の非同期処理が完了するまで待つ構文が利用できます。 await 式を使うことで非同期処理を同期処理のように扱えるため、Promise チェーンで実現していた処理の流れを読みやすく書けます。

# Async Function の定義

Async Function は必ず Promise インスタンスを返す
Async Function 内では await 式が利用できる

# Async Function は Promise を返す

Async Functionとして定義した関数は必ずPromiseインスタンスを返します。 具体的にはAsync Functionが返す値は次の3つのケースが考えられます。

Async Functionが値をreturnした場合、その返り値を持つFulfilledなPromiseを返す

Async FunctionがPromiseをreturnした場合、その返り値のPromiseをそのまま返す

Async Function内で例外が発生した場合は、そのエラーを持つRejectedなPromiseを返す

# await式

await式は右辺のPromiseインスタンスがFulfilledまたはRejectedになるまでその場で非同期処理の完了を待ちます。 そしてPromiseインスタンスの状態が変わると、次の行の処理を再開します。

await式では非同期処理を実行して完了するまで、次の行（次の文）を実行しません。 そのためawait式を使うことで非同期処理が同期処理のように上から下へと順番に実行するような処理順で書けます。

```
// async functionは必ずPromiseを返す
async function doAsync() {
    // 非同期処理
}
async function asyncMain() {
    // doAsyncの非同期処理が完了するまでまつ
    await doAsync();
    // 次の行はdoAsyncの非同期処理が完了されるまで実行されない
    console.log("この行は非同期処理が完了後に実行される");
}
```





// await式のエラーはtry...catchできる

# Promiseチェーンをawait式で表現する











