function delay(timeoutMs) {
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            resolve();
        },timeoutMs)
    })
}
// `then`メソッドで成功時のコールバック関数だけを登録

delay(1000).then(() =>{
    console.log("1000ミリ秒後に呼ばれる");
    
})