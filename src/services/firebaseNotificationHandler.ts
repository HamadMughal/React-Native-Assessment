// firebaseNotificationHandler.ts
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { setFcmToken, setPermissionGranted } from '../store/slices/fcmSlice';
import { store } from '../store/store';

export async function requestUserPermission() {
  try {
    // Create notification channel for Android
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }

    // Request notification permissions
    await notifee.requestPermission();
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // Store permission status in Redux
    store.dispatch(setPermissionGranted(enabled));

    if (enabled) {
      console.log('Notification permission granted');
      await getFCMToken();
    } else {
      console.log('Notification permission denied');
    }
  } catch (error) {
    console.log('Error requesting notification permission:', error);
    store.dispatch(setPermissionGranted(false));
  }
}

async function getFCMToken() {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM Token received:=======', fcmToken);
      // Store FCM token in Redux store
      store.dispatch(setFcmToken(fcmToken));
      return fcmToken;
    } else {
      console.log('Failed to get FCM token');
      return null;
    }
  } catch (error) {
    console.log('Error fetching FCM token:', error);
    return null;
  }
}

export function setupForegroundNotificationListener() {
  try {
    return messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification received:', remoteMessage);

      try {
        // Display notification using notifee for better control
        await notifee.displayNotification({
          title: remoteMessage.notification?.title || 'New Notification',
          body: remoteMessage.notification?.body || 'You have a new message',
          data: remoteMessage.data,
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
            smallIcon: 'ic_launcher_round',
            pressAction: {
              id: 'default',
            },
          },
          ios: {
            sound: 'default',
          },
        });
      } catch (error) {
        console.log('Error displaying notification:', error);
      }
    });
  } catch (error) {
    console.log('Error setting up foreground listener:', error);
  }
}

export function setupNotificationOpenedListeners() {
  try {
    // Handle notification when app is opened from background state
    const unsubscribeBackground = messaging().onNotificationOpenedApp(
      remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from background by notification:', remoteMessage);
          // Handle navigation or other actions based on notification data
          handleNotificationAction(remoteMessage);
        }
      },
    );

    // Handle notification when app is opened from quit (killed) state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from quit state by notification:', remoteMessage);
          // Handle navigation or other actions based on notification data
          handleNotificationAction(remoteMessage);
        }
      });

    return unsubscribeBackground;
  } catch (error) {
    console.log('Error setting up notification opened listeners:', error);
  }
}

// Helper function to handle notification actions
function handleNotificationAction(remoteMessage: any) {
  console.log('Handling notification action:', remoteMessage.data);
}

// Function to get current FCM token from store
export function getCurrentFcmToken() {
  const state = store.getState();
  return state.fcm.token;
}

// Function to refresh FCM token
export async function refreshFcmToken() {
  try {
    await messaging().deleteToken();
    const newToken = await getFCMToken();
    return newToken;
  } catch (error) {
    console.log('Error refreshing FCM token:', error);
    return null;
  }
}
