import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { getDatabase, ref, set, update ,remove,onValue,get ,child} from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBToEkvxspqEQl4qBKu4OTJ8BcU_iqfWrw",
  authDomain: "login-form-34572.firebaseapp.com",
  databaseURL: "https://login-form-34572-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "login-form-34572",
  storageBucket: "login-form-34572.firebasestorage.app",
  messagingSenderId: "47566707376",
  appId: "1:47566707376:web:ab1abd7f8afcabef5bb975"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export {
  auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  doc,
  setDoc,
  db,
  getDoc,
  ref,
  set,
  database,
  collection,
  addDoc,
  update,
  remove,
  onValue ,
  get,
  child,
};