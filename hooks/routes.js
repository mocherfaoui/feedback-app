import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { useAuth } from '@/lib/auth';

export function withPublic(Component) {
  return function WithPublic(props) {
    const cookie = Cookies.get('feedback-app-cookie');
    const router = useRouter();

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (cookie) {
          router.replace('/sites');
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    }, [cookie]);
    return <Component cookie={cookie} {...props} />;
  };
}
export function withProtected(Component) {
  return function WithProtected(props) {
    const cookie = Cookies.get('feedback-app-cookie');
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (!cookie) {
          router.replace('/');
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    }, [cookie]);

    if (!auth.user) {
      return null;
    }
    return <Component cookie={cookie} {...props} />;
  };
}
