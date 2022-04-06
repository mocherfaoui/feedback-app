import { useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';

import { useAuth } from '@/lib/auth';

import LoadingState from '@/components/LoadingState';

export function withPublic(Component) {
  return function WithPublic(props) {
    const cookie = Cookies.get('feedback-app-cookie');

    if (cookie) {
      Router.replace('/sites');
      return <LoadingState/>;
    }
    return <Component cookie={cookie} {...props} />;
  };
}
export function withProtected(Component) {
  return function WithProtected(props) {
    const cookie = Cookies.get('feedback-app-cookie');
    const auth = useAuth();

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (!cookie) {
          Router.replace('/sign-in');
        }
      }, 3000);
      return () => clearTimeout(timeoutId);
    }, [cookie]);

    if (!auth.user) {
      return <LoadingState />;
    }
    return <Component cookie={cookie} {...props} />;
  };
}
