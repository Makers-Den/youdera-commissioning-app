import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCookie, getCookie } from 'cookies-next';
import { useEffect } from 'react';

import {
  forgotPassword,
  getUserInfo,
  login,
  logOut,
  resetPassword,
} from './apiRequests';
import { youderaApiInstance } from '../../api-instances/youdera';
import { CookiesKeys } from '../../enums/cookiesKeys';
import { QueryKeys } from '../../enums/queryKeys';

export const useCurrentUserQuery = () =>
  useQuery([QueryKeys.userInfo], getUserInfo, {
    enabled: false,
  });

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

  const forgotPasswordMutation = useMutation(forgotPassword);

  const resetPasswordMutation = useMutation(resetPassword);

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
      userInfoQuery.refetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    userInfoQuery,
    isAuthenticated: !!userInfoQuery.data,
    loginMutation,
    logOutMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
  };
};
