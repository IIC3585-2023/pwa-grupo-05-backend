const { getMessaging } = require('firebase-admin/messaging');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const sendNotification = async (token, msg) => {
  try {
    const res = await getMessaging().send({
      webpush: {
        notification: {
          ...msg,
          click_action: 'https://iic3585-2023.github.io/pwa-grupo-05/',
          icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Icon_Pinguin_1_512x512.png',
          requireInteraction: false,
          actions: [{
            title: 'Open',
            action: 'open',
          }],
        },
      },
      token,
    });
    return res;
  } catch (e) {
    console.error('send FCM message error', e);
    return e;
  }
};

const sendNotifications = async (tokenToExclude, msg) => {
  try {
    const response = await fetch(
      'https://6459a3698badff578e117409.mockapi.io/tokens',
    );
    const tokens = await response.json();
    await Promise.all(
      tokens
        .filter(({ token }) => token !== tokenToExclude)
        .map(({ token }) => sendNotification(token, msg)),
    );
  } catch (e) {
    console.log("ERROR: ", e);
  }
};

module.exports = {
  sendNotifications,
};
