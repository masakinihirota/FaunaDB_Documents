const promsie = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject();
    resolve();
    resolve(); // 二度目以降のresolveやrejectは無視される
  }, 16);
});

promsie.then(
  () => {
    console.log("最初のresolve時に一度だけ呼ばれる");
  },
  (error) => {
    console.log("この行は呼び出されない");
  }
);
