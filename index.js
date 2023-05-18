const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');

const { sendNotification } = require('./sendNotification');

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

app.listen(port, async() => {
  // sendNotification("cabnuVvQzcFctSRJQh1iVj:APA91bEKXzxzTA_3zCNHe3M6fcQOV9ZCo2Ba923Qm5Lx-SA_aDhSdofRIiX6EBftnl9Wnmy3Ef9aiVIRFVEHTb8k5ByLyB-eHW_jXHy6iyijXodqXsPCWhBb4pgNhr-hNzfAC-NAsbdU",
  // {
  //   title: 'wena',
  //   body: 'wenasa',
  // });
  console.log(`Example app listening on port ${port}`);
});
