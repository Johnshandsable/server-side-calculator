const { request } = require('express');
const express = require('express');

const app = express();
const PORT = 5000;

// module imports

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

// GET endpoint for /tournaments
app.get('/tournaments', (req, res) => {
  res.send(tournamentsArray);
});

// POST endpoint for /players
app.post('/players', (req, res) => {
  let newPlayer = req.body.player_to_add;
  res.sendStatus(200);
});
