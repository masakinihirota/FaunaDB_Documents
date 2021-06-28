// 関数宣言のAsync Function版
async function fn1() {}

// 関数式のAsync Function版
const fn2 = async function () {};

// Arrow FunctionのAsync Function版
const fn3 = async () => {};

// メソッドの短縮記法のAsync Function版
const obj = { async method() {} };

// 上記オブジェクトのカッコを外すとエラーになる
// const obj = async method() {} ;

// これらのAsync Functionは、次の点以外は通常の関数と同じ性質を持ちます。

// Async Functionは必ずPromiseインスタンスを返す
// Async Function内ではawait式が利用できる

console.log(fn3);

console.log(obj);
