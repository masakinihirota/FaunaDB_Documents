// # await式はAsync Functionの中でのみ利用可能

// asyncではない関数では`await`式は利用できない
function main() {
     // SyntaxError: await is only valid in async functions
     await Promise.resolve();
}

