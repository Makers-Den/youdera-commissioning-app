import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { login } from '../mutations/login';
import { logOut } from '../mutations/logOut';
import { getUserInfo } from '../queries/getUserInfo';
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
      queryClient.setQueryData([QueryKeys.userInfo], () => null);
    },
  });

  return {
    isAuthenticated: !!userInfoQuery.data,
    userInfoQuery,
    loginMutation,
    logOutMutation,
  };
};
