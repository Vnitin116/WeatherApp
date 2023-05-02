import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
} export async function GetFCMToken() {
    let fmctoken = await AsyncStorage.getItem('fcmtoken');
    if (!fmctoken) {
        try {
            fmctoken = await messaging().getToken();
            if (fmctoken) {
                await AsyncStorage.setItem('fcmtoken', fmctoken);
                console.log('FCM token:', fmctoken);
                return fmctoken;
            } else {
                console.log('FCM token not available');
            }
        } catch (error) {
            console.log('Error retrieving FCM token:', error);
        }
    } else {
        console.log('FCM token already exists:', fmctoken);
        return fmctoken;
    }
}
export const notificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });
    messaging().onMessage(async remoteMessage => {
        console.log('remote message')
    })
}