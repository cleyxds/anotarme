import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

import FIREBASE_CONFIG from "../config/firebase.config.json"

export const app = initializeApp(FIREBASE_CONFIG)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()
