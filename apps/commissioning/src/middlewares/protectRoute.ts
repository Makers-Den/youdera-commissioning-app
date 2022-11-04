import { getUserInfo } from '@src/integrations/youdera/auth/queries/getUserInfo';
import { Role } from '@src/integrations/youdera/auth/types';
import { CookiesKeys } from '@src/integrations/youdera/enums/cookiesKeys';
import { addYouderaAuthInterceptors } from '@src/utils/server/addYouderaAuthInterceptors';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';

/**
 * This function also is adding auth interceptors on success
 */
export const protectRoute = <
  Func extends (context: GetServerSidePropsContext) => any,
>(
  enabledRoles: Role[],
) => ({
  then: (callback: Func) => async (context: GetServerSidePropsContext) => {
    const { req, res } = context;

    const checkToken = getCookie(CookiesKeys.accessToken, { req, res });

    if (!checkToken) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    addYouderaAuthInterceptors(context);

    try {
      const currentUser = await getUserInfo();

      if (enabledRoles.includes(currentUser.role)) {
        const res = (await callback(context)) as Awaited<ReturnType<Func>>;
        return res;
      }
    } catch {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  },
});
