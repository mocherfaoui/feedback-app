/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Loading } from '@geist-ui/core';
import Cookies from 'js-cookie';

import { useAuth } from '@/lib/auth';

import { Flex } from '@/components/GlobalComponents';

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
      return (
        <>
          <Head>
            <title>redirecting...</title>
          </Head>
          <Flex css={{ height: '100vh' }}>
            <Loading>Redirecting</Loading>
          </Flex>
        </>
      );
    }
    return <Component cookie={cookie} {...props} />;
  };
}
