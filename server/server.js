const { request } = require('express');
const express = require('express');

const app = express();
const PORT = 5000;

// module imports
const operations = require('./modules/mathoperations');
const results = require('./modules/storage');

app.use(express.static('server/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, function () {
  // When the server is ready, call this function
  console.log(`I'm listening.... `, PORT);

  // If you see a EADDRINUSE error,
  // run:
  //    killall -9 node
  // ..and try again
});

// GET endpoint
app.get('/logoperations', (req, res) => {
  console.log('GET - /logoperations');
  // console.log(operations.add(7, 10)); // 17
  // console.log(operations.subtract(7, 10)); // -3
  // console.log(operations.multiply(7, 10)); // 70
  // console.log(operations.divide(7, 10)); // 0.7
  console.table(results.getStoredResults());
  return res.send(results.getStoredResults());
});

// POST endpoint
app.post('/logoperations', (req, res) => {
  console.log('POST - /logoperations');
  let operationData = req.body.data_to_add;

  // DATA COMES IN AS STRINGS, NEED TO CONVERT TO NUMBER
  let numX = Number(operationData.x);
  let numY = Number(operationData.y);
  let result = '';

  /*
    The below code can be a little daunting. Keep in mind that we're checking the 
    operations individually but there may be a better way. TODO - Find a better way
  */
  if (operationData.operation === '+') {
    console.log(`${numX} + ${numY}`);
    result = operations.add(numX, numY);
  } else if (operationData.operation === '-') {
    console.log(`${numX} - ${numY}`);
    result = operations.subtract(numX, numY);
  } else if (operationData.operation === '*') {
    console.log(`${numX} * ${numY}`);
    result = operations.multiply(numX, numY);
  } else if (operationData.operation === '/') {
    console.log(`${numX} / ${numY}`);
    result = operations.divide(numX, numY);
  } else if (operationData.operation === '%') {
    console.log(`${numX} * ${numY} / 100`);
    result = operations.percentage(numX, numY);
  } else if (operationData.operation === '//') {
    console.log(`${numX} % ${numY}`);
    result = operations.modulo(numX, numY);
  }

  console.log(`result is: ${result}`);

  console.log('storing results');

  results.addToStoredResults({
    x: numX,
    y: numY,
    operation: operationData.operation,
    result: result,
  });

  console.table(results.getStoredResults());

  // DO SOMETHING WITH req.body
  // CALL THE FUNCTION
  // RETURN THE RESPONSE
  res.sendStatus(200);
});
