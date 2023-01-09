import React, { createContext, useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import {
  getIdTokenResult,
  linkWithPopup,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
  unlink,
  updateProfile,
} from '@firebase/auth';
import { useToasts } from '@geist-ui/core';
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
  const { setToast } = useToasts();
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
  const handleError = (error) => {
    setLoading(false);
    console.log(error);
  };
  const signinWithGithub = async (redirect) => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider)
      .then((response) => {
        handleUser(response.user);
        if (redirect) {
          Router.push(redirect);
        }
      })
      .catch((error) => handleError(error));
  };
  const signinWithGoogle = async (redirect) => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((response) => {
        handleUser(response.user);
        if (redirect) {
          Router.push(redirect);
        }
      })
      .catch((error) => handleError(error));
  };
  const linkOrUnlinkGoogle = (isToggled) => {
    return isToggled
      ? linkWithPopup(auth.currentUser, googleProvider)
          .then((result) => {
            handleUser(result.user);
          })
          .catch((error) => handleError(error))
      : unlink(auth.currentUser, "google.com")
          .then((result) => handleUser(result.user))
          .catch((error) => handleError(error));
  };
  const linkOrUnlinkGithub = (isToggled) => {
    return isToggled
      ? linkWithPopup(auth.currentUser, githubProvider)
          .then((result) => {
            handleUser(result.user);
          })
          .catch((error) => handleError(error))
      : unlink(auth.currentUser, "github.com")
          .then((result) => handleUser(result.user))
          .catch((error) => handleError(error));
  };
  const updateUsername = async (newDisplayName) => {
    return updateProfile(auth.currentUser, {
      displayName: newDisplayName,
    }).then(() => handleUser(auth.currentUser));
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
    updateUsername,
  };
}
const formatUser = async (user) => {
  const { token } = await getIdTokenResult(user, true);
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
