import { initBearerTokenInterceptorOnServerSide } from '@src/api/youdera/api-instances/youdera';
import { Role } from '@src/api/youdera/apiTypes';
import { CookiesKeys } from '@src/api/youdera/enums/cookiesKeys';
import { getUserInfo } from '@src/api/youdera/hooks/auth/apiRequests';
import { routes } from '@src/utils/routes';
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
          destination: routes.login,
          permanent: false,
        },
      };
    }

    initBearerTokenInterceptorOnServerSide(context);

    try {
      const currentUser = await getUserInfo();

      if (enabledRoles.includes(currentUser.role)) {
        const res = (await callback(context)) as Awaited<ReturnType<Func>>;
        return res;
      }
    } catch {
      return {
        redirect: {
          destination: routes.login,
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: routes.login,
        permanent: false,
      },
    };
  },
});
