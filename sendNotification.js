const { getMessaging } = require('firebase-admin/messaging');

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

module.exports = {
  sendNotification,
};
