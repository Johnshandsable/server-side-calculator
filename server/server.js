const { request } = require('express');
const express = require('express');

const app = express();
const PORT = 5000;

// module imports
const operations = require('./modules/mathoperations');

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
  console.log(operations.add(7, 10)); // 17
  console.log(operations.subtract(7, 10)); // -3
  console.log(operations.multiply(7, 10)); // 70
  console.log(operations.divide(7, 10)); // 0.7
  res.sendStatus(200);
});

// POST endpoint
