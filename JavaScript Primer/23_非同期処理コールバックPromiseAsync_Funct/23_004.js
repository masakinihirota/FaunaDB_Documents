const fs = require("fs");

function foo() {
  try {
    fs.readFile("/no/such/file", (err, data) => {
      if (err) throw err;
      console.log(data);
    });
    console.log("foo");
  } catch (err) {
    console.log("caught", err);
  }
}
foo();
