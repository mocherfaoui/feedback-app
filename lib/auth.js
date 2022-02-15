import React, { createContext,useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import {
  getIdTokenResult,
  linkWithPopup,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
  unlink,
} from '@firebase/auth';
import Cookies from 'js-cookie';

import { createUser } from './db';
import { auth, githubProvider, googleProvider } from './firebase';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => {
  return useContext(authContext);
};
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser = auth.currentUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      createUser(user.uid, userWithoutToken);

      setUser(user);
      Cookies.set('feedback-app-cookie', true, { expires: 1 });
      setLoading(false);
      return user;
    } else {
      setUser(false);
      Cookies.remove('feedback-app-cookie');
      setLoading(false);
      return false;
    }
  };

  const signinWithGithub = async () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider).then(
      (response) => {
        handleUser(response.user);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const signinWithGoogle = async (redirect) => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).then(
      (response) => {
        handleUser(response.user);
        if (redirect) {
          Router.push(redirect);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const linkOrUnlinkGoogle = async (checked) => {
    if (checked) {
      return linkWithPopup(auth.currentUser, googleProvider).then((result) => {
        handleUser(result.user);
      });
    } else
      return unlink(auth.currentUser, 'google.com').then((result) =>
        handleUser(result.user)
      );
  };
  const linkOrUnlinkGithub = async (checked) => {
    if (checked) {
      return linkWithPopup(auth.currentUser, githubProvider).then((result) => {
        handleUser(result.user);
      });
    } else
      return unlink(auth.currentUser, 'github.com').then((result) =>
        handleUser(result.user)
      );
  };
  const signout = async () => {
    await signOut(auth);
    return handleUser(false);
  };
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser);

    return () => unsubscribe();
  }, []);
  return {
    user,
    loading,
    signinWithGithub,
    signinWithGoogle,
    linkOrUnlinkGoogle,
    linkOrUnlinkGithub,
    signout,
  };
}
const formatUser = async (user) => {
  const { token } = await user.getIdTokenResult();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName || 'User',
    token,
    providers: user.providerData.map((provider) => ({
      name: provider.providerId,
    })),
    photoURL: user.photoURL,
  };
};
