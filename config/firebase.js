import firebase from "firebase/compat/app";
//import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  measurementId: Constants.manifest.extra.measurementId
};

let Firebase;

if(firebase.apps.length === 0) {
    Firebase = firebase.initializeApp(firebaseConfig);
}

//const analytics = getAnalytics(app);
export default Firebase;