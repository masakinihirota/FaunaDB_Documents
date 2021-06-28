Promise.reject(new Error("era-")).catch(()=>{
    // 非同期的なタイミングで実行
    console.log(2);
    
})
// 同期的
console.log(1);

