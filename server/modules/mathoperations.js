function add(x, y) {
  const result = x + y;
  return result;
}

function subtract(x, y) {
  const result = x - y;
  return result;
}

function divide(x, y) {
  const result = round(x / y);
  return Number(result);
}

function multiply(x, y) {
  const result = x * y;
  return result;
}

function round(number) {
  /*
    Returns the number after rounding it to two decimal places and converting to a number
  */
  return Number(number.toFixed(2));
}

module.exports = { add, subtract, divide, multiply };
