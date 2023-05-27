import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOsIK4QUxZQtix8JNO4QsqBQ1BWX8TLmo",
  authDomain: "shop-a1f4e.firebaseapp.com",
  projectId: "shop-a1f4e",
  storageBucket: "shop-a1f4e.appspot.com",
  messagingSenderId: "252380080207",
  appId: "1:252380080207:web:284ddec6392567c7bfe23a",
};

const firebaseApp = initializeApp(firebaseConfig);
const app = getFirestore(firebaseApp);

export default app;
