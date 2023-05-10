// import fetch from 'node-fetch';
const express = require('express');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/tweets', async (_, res) => {
  const response = await fetch(
    'https://6459a3698badff578e117409.mockapi.io/tweets',
  );
  return res.send(response);
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
  return res.send(tweets);
});
