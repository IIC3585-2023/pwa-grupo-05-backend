const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');

const { sendNotifications } = require('./sendNotification');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = 5001;

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
  const tweets = await fetch(
    'https://6459a3698badff578e117409.mockapi.io/tweets',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...req.body,
        date: Date.now() / 1000,
      }),
    },
  );
  const { user, token } = req.body;
  sendNotifications(token, {
    title: 'Twitter',
    body: `${user} ha publicado un tweet`,
  });
  const resJson = await tweets.json();
  return res.send(resJson);
});

app.post('/subscribe', async (req, res) => {
  const tweets = await fetch(
    'https://6459a3698badff578e117409.mockapi.io/tokens',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...req.body,
      }),
    },
  );
  const resJson = await tweets.json();
  return res.send(resJson);
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
