import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const expoConfig = Constants.expoConfig.extra;

/* Firebase config */
const firebaseConfig = {
  apiKey: expoConfig.FIREBASE_API_KEY,
  authDomain: expoConfig.FIREBASE_AUTH_DOMAIN,
  projectId: expoConfig.FIREBASE_PROJECT_ID,
  storageBucket: expoConfig.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: expoConfig.FIREBASE_MESSAGING_SENDER_ID,
  appId: expoConfig.FIREBASE_APP_ID,
};

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);

/* Services */
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { app, auth, db };