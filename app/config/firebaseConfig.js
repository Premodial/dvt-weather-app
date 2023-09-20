import {initializeApp, getApps} from 'firebase/app';
import {getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth'; // Add these imports
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const firebaseConfigDev = {
  apiKey: process.env.REACT_APP_API_URL_DEV,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_DEV,
  projectId: process.env.REACT_APP_PROJECT_ID_DEV,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_DEV,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_DEV,
  appId: process.env.REACT_APP_APP_ID_DEV,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID_DEV,
  appVerificationDisabledForTesting: true,
};

const firebaseConfigProd = {
  apiKey: process.env.REACT_APP_API_URL_PROD,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_PROD,
  projectId: process.env.REACT_APP_PROJECT_ID_PROD,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_PROD,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_PROD,
  appId: process.env.REACT_APP_APP_ID_PROD,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID_PROD,
  appVerificationDisabledForTesting: true,
};

const firebaseConfigStagging = {
  apiKey: process.env.REACT_APP_API_URL_STAGING,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_STAGING,
  projectId: process.env.REACT_APP_PROJECT_ID_STAGING,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_STAGING,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_STAGING,
  appId: process.env.REACT_APP_APP_ID_STAGING,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID_STAGING,
  appVerificationDisabledForTesting: true,
};

// Initialize Firebase
const getFirebaseConfig = () => {
  switch (process.env.REACT_APP_ENV) {
    case 'stagging':
      return firebaseConfigStagging;
    case 'dev':
      return firebaseConfigDev;
    default:
      return firebaseConfigProd;
  }
};

const firebaseConfig = getFirebaseConfig();

// Checking if firebase app already exist.
const initializeFirebaseApp = () => {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  } else {
    return getApps()[0];
  }
};

const firebaseApp = initializeFirebaseApp();

// Get instances of Auth, Firestore, and Storage
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {
  firebaseApp, auth, firestore, storage,
};
