import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app =
  getApps().length === 0
    ? initializeApp({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      })
    : getApp();

const auth = getAuth();
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();
const db = getFirestore();
export { auth, githubProvider, googleProvider, db };
