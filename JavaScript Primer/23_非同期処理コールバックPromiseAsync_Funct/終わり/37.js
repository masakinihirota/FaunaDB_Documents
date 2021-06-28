function dummyFetch(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith("/resource")) {
        resolve({ body: ` Response body of ${path}` });
      } else {
        reject(new Error("NOT FOUND"));
      }
    }, 100 * Math.random());
  });
}

const fetchedPromise = Promise.all([
  dummyFetch("/resource/A"),
  dummyFetch("/not_found/B"), // Bは存在しないため失敗する
]);

fetchedPromise.then(([responseA,responseB])=>{
      // この行は実行されません
}).catch(error=>{
    console.error(error);// Error: NOT FOUND  
})