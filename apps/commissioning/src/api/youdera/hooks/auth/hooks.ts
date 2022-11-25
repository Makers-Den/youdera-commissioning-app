import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { useCallback } from 'react';

import {
  forgotPassword,
  getUserInfo,
  login,
  logOut,
  resetPassword,
} from './apiRequests';
import { youderaApiInstance } from '../../api-instances/youdera';
import { DataResponse, UserInfo } from '../../apiTypes';
import { CookiesKeys } from '../../enums/cookiesKeys';
import { QueryKeys } from '../../enums/queryKeys';

export const useSuspensfulCurrentUserQuery = () =>
  useQuery([QueryKeys.userInfo], getUserInfo, {
    suspense: true,
  });

export const useAuth = () => {
  const queryClient = useQueryClient();

  const userInfoQuery = useQuery([QueryKeys.userInfo], getUserInfo);

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

  return {
    userInfoQuery,
    isAuthenticated: !!userInfoQuery.data,
    loginMutation,
    logOutMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
  };
};

type UpdateUserDetailsPayload = {
  firstName: string;
  lastName: string;
  email: string;
}

export const useUpdateUserDetailsMutation = () =>
  useMutation(
    useCallback(
      ({ firstName, lastName, email }: UpdateUserDetailsPayload) =>
        youderaApiInstance.put<DataResponse<UserInfo>>('/profile', {
          first_name: firstName,
          last_name: lastName,
          email,
        }).then(r => r.data.data),
      []
    )
  );

  type UpdateUserPasswordPayload = {
    oldPassword: string;
    newPassword: string;
  }

  export const useUpdateUserPasswordMutation = () =>
  useMutation(
    useCallback(
      ({ oldPassword, newPassword }: UpdateUserPasswordPayload) =>
        youderaApiInstance.put('/users/changePassword', {
          oldPassword,
          newPassword
        }),
      []
    )
  );