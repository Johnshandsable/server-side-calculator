function add(x, y) {
  const result = x + y;
  return result;
}

function subtract(x, y) {
  const result = x - y;
  return result;
}

function divide(x, y) {
  const result = (x / y).toFixed(2); // toFixed converts to a string
  return Number(result); // Number() is used to return an actual number
}

function multiply(x, y) {
  const result = x * y;
  return result;
}

module.exports = { add, subtract, divide, multiply };
