Promise.reject(new Error("era-")).catch(error =>{
    console.log(error);//Error: era-
    
}).then(() =>{
    console.log("thenのコールバック関数が呼び出される");
    
})