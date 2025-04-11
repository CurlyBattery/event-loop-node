synchronousFunction = () => {
  console.log('first');
  return 'Выполнилась синхронная функция';
}

asynchronousFunction = () => {
  console.log('second');
  return 'Выполнилась асинхронная функция';
}

timeOutFunction = () => {
  console.log('third');
  return 'Выполнился тайм аут';
}

module.exports = { synchronousFunction, asynchronousFunction, timeOutFunction };