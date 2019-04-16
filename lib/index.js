const chunksOf = k => xs =>
  xs.reduce(
    (acc, x, i) =>
      i % k === 0
        ? [...acc, [x]]
        : acc.map((a, j) => (j === acc.length - 1 ? [...a, x] : a)),
    [],
  );

module.exports = { chunksOf };
