import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from '@/components/firebase-config'

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
