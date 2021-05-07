import * as Notifications from 'expo-notifications';

const setNotification = (durationInMilliseconds: number) => {
  const durationInSeconds = durationInMilliseconds / 1000;

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  Notifications.scheduleNotificationAsync({
    content: {
      title: "Time's up!",
      body: 'Change sides!',
    },
    trigger: {
      seconds: durationInSeconds,
    },
  });
};

export default setNotification;
