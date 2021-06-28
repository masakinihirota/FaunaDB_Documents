Promise.resolve(1)
  .then((value) => {
    console.log(value); //1
    return value * 2;
  })
  .then((value) => {
    console.log(value);
    return value * 2; // 2
  })
  .then((value) => {
    console.log(value); //=>4
  }) // return していないので次には渡らない 
  .then((value) => {
    console.log(value); // undefined
  });
