const promise =new Promise((resolve, reject) =>{
    // コンストラクタ関数
    console.log(1);
    resolve();
})

promise.then(() =>{
    // 非同期関数
    console.log(3);
    
})

// 同期関数
console.log(2);
