import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

!getApps().length
  ? initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    })
  : getApp();

const auth = getAuth();
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();
const db = getFirestore();
export { auth, db, githubProvider, googleProvider };
