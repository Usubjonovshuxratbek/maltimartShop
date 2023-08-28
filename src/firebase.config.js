import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage' 

const firebaseConfig = {
  apiKey: "AIzaSyDczomgkSGA_Xz2xVL-eDnHPtfbvugzT_w",
  authDomain: "maltimart-52fb7.firebaseapp.com",
  projectId: "maltimart-52fb7",
  storageBucket: "maltimart-52fb7.appspot.com",
  messagingSenderId: "185439580362",
  appId: "1:185439580362:web:ed265d8af98f116f700433",
  measurementId: "G-LK92BFF25F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default analytics;