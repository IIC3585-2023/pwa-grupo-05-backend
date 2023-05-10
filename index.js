// import fetch from 'node-fetch';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/tweets', async (_, res) => {
  const tweets = await fetch(
    'https://6459a3698badff578e117409.mockapi.io/tweets',
  );

  const resJson = await tweets.json();
  return res.send(resJson);
});

app.post('/tweets', async (req, res) => {
  const { user, body } = req.body;

  const tweets = await fetch(
    'https://6459a3698badff578e117409.mockapi.io/tweets',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        body,
        date: Date.now() / 1000,
      }),
    },
  );
  const resJson = await tweets.json();
  return res.send(resJson);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
