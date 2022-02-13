import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';

export function withPublic(Component) {
  return function WithPublic(props) {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (auth.user) {
          router.replace('/sites');
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    }, [auth.user]);
    return <Component auth={auth} {...props} />;
  };
}
export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (!auth.user) {
          router.replace('/');
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    }, [auth.user]);

    if (!auth.user) {
      return null;
    }
    return <Component auth={auth} {...props} />;
  };
}
