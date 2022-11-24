import axios from 'axios';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';

import { CookiesKeys } from '../enums/cookiesKeys';

export const youderaApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_YOUDERA_API_BASE,
  withCredentials: process.env.NEXT_PUBLIC_YOUDERA_AUTH_METHOD === 'SESSION',
  headers: { Accept: 'application/json' },
});


/**
 * For the dev api, this needs to be called before we're using youderaApiInstance,
 * otherwise it won't have the required Bearer token.
 * This function only supports doing it on client-side/browser, because it relies on fetching the accessToken
 * from a cookie via browser api. 
 */
export function initBearerTokenInterceptorOnClientSide() {
  const accessToken = getCookie(CookiesKeys.accessToken);

  if (accessToken) {
    // eslint-disable-next-line no-console
    console.log(`Configuring api instance to use Bearer token ${accessToken}`)
    youderaApiInstance.interceptors.request.clear();
    youderaApiInstance.interceptors.request.use(config => ({
      ...config,
      headers: {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      }
    }));
  }
}

/**
 * For the dev api, this needs to be called before we're using youderaApiInstance,
 * otherwise it won't have the required Bearer token.
 * This function only supports doing it on server side, because it relies on fetching the request context. 
 */
export function initBearerTokenInterceptorOnServerSide(context: GetServerSidePropsContext) {
  const { req, res } = context;
  youderaApiInstance.interceptors.request.use(config => {
    const accessToken = getCookie(CookiesKeys.accessToken, { req, res });
    return {
      ...config,
      headers: {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      },
    };
  });
}
