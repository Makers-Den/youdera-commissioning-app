import { youderaApiInstance } from '@src/integrations/youdera/api-instances/youdera';
import { CookiesKeys } from '@src/integrations/youdera/enums/cookiesKeys';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';

export function addYouderaAuthInterceptors(context: GetServerSidePropsContext) {
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
