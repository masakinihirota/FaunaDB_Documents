async function asyncMain() {
  // `await`式で評価した右辺のPromiseがRejectedとなったため、例外がthrowされる
  const value = await Promise.reject(new Error("エラーメッセージ"));
  // await式で例外が発生したため、この行は実行されません
}

// Async Functionは自動的に例外をキャッチできる
asyncMain().catch((error) => {
  console.log(error.message);
});
