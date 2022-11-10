import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCookie, getCookie } from 'cookies-next';
import { useEffect } from 'react';

import { login } from '../mutations/login';
import { logOut } from '../mutations/logOut';
import { getUserInfo } from '../queries/getUserInfo';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CookiesKeys } from '../../enums/cookiesKeys';
import { QueryKeys } from '../../enums/queryKeys';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const userInfoQuery = useQuery([QueryKeys.userInfo], getUserInfo, {
    enabled: false,
  });

  const loginMutation = useMutation(login, {
    onSuccess: () => {
      userInfoQuery.refetch();
    },
  });

  const logOutMutation = useMutation(logOut, {
    onSuccess: () => {
      deleteCookie(CookiesKeys.accessToken);
      queryClient.setQueryData([QueryKeys.userInfo], () => null);
    },
  });

  useEffect(() => {
    const checkToken = getCookie(CookiesKeys.accessToken);
    if (checkToken) {
      youderaApiInstance.interceptors.request.clear();
      youderaApiInstance.interceptors.request.use(config => {
        const accessToken = getCookie(CookiesKeys.accessToken);

        return {
          ...config,
          headers: {
            ...config.headers,
            authorization: `Bearer ${accessToken}`,
          },
        };
      });
    }
    userInfoQuery.refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isAuthenticated: !!userInfoQuery.data,
    userInfoQuery,
    loginMutation,
    logOutMutation,
  };
};
