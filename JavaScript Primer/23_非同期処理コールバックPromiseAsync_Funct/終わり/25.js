// RejectedなPromiseは次の失敗時の処理までスキップする
const rejectedPromise = Promise.reject(new Error("era-"))

rejectedPromise.then(() =>{
    // このthenのコールバック関数は呼び出されません
}).then(() =>{
    // このthenのコールバック関数は呼び出されません
}).catch((error) =>{
    console.log(error.message); // failure
    
})