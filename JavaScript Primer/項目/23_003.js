function foo() {
  try {
    throw new Error("░▒▓▇▅▂＼(‘ω’)／▂▅▇▓▒░ うおあああああああああああ！！！！");
  } catch (err) {
    console.log(err);
  }
}

foo();
