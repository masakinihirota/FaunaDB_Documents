// async内でforEachをつかってはいけない
// forループの代わりにArray#forEachメソッドは利用できません。
async function fetchResources(resources) {
  const results = [];

  // Syntax Errorとなる例
  // 下記の行のfunctionの前にasyncをつけると非同期関数になりエラーは消える
  resources.forEach(function (response) {
    const resource = resources[i];
    // Async Functionではないスコープで`await`式を利用しているためSyntax Errorとなる
    const response = await dummyFetch(resource);
    results.push(response.body);
  });
  return results;
}
