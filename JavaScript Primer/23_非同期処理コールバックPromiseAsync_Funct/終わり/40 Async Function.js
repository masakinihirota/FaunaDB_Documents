async function doAsync() {
    // 返り値はPromiseのインスタンスになる。
  return "値";
}

// doAsync関数はPromiseを返す
doAsync().then((value) => {
  console.log(value);
});

// 下記と同じ

function doAsync2(){
    // 返り値にPromiseのインスタンスを返している。
    return Promise.resolve("値2")
}

doAsync2().then((value) => {
    console.log(value);
    
})