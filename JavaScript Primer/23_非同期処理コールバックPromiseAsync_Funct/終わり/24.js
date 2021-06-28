
// ランダムでFulfilledまたはRejectedの`Promise`インスタンスを返す関数

function asyncTask(){
    return Math.random()>0.5
    ? Promise.resolve("success")
    : Promise.reject(new Error("failure"))
}

// asyncTask関数は新しい`Promise`インスタンスを返す

asyncTask()

// thenメソッドは新しい`Promise`インスタンスを返す
.then(function onFulfilled(value){
    console.log(value);// success
    
})
   // catchメソッドは新しい`Promise`インスタンスを返す
   .catch(function onRejected(error){
       console.log(error.message);// 失敗
       
   })