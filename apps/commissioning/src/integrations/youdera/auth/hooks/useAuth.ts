import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import create from 'zustand/react';

import { youderaApiInstance } from '../../api-instances/youdera';

const loginJWT = async ({
  email,
  password,
  remember,
}: {
  email: string;
  password: string;
  remember: boolean;
}) => {
  const response = await youderaApiInstance.post(`/login`, {
    email,
    password,
    remember,
  });

  const { data } = response;

  // todo add to header jwt token

  // youderaApiInstance.interceptors(() => {})

  return data;
};

const loginSession = async ({
  email,
  password,
  remember,
}: {
  email: string;
  password: string;
  remember: boolean;
}) => {
  await youderaApiInstance.get('/csrf-cookie');

  const response = await youderaApiInstance.post(`/login`, {
    email,
    password,
    remember,
  });

  return response.data;
};

const login =
  process.env.NEXT_PUBLIC_YOUDERA_AUTH_METHOD === 'SESSION'
    ? loginSession
    : loginJWT;

const logOut = async () => {
  const response = await youderaApiInstance.get(`/auth/logout`);
  return response.data;
};

const getUserInfo = async () => {
  const response = await youderaApiInstance.get(`/auth`);
  return response.data;
};

export const authQueryKey = ['user-info'];

export const useAuth = create((set, get) => {
  const queryClient = useQueryClient();

  const query = useQuery(authQueryKey, getUserInfo, {
    enabled: false,
  });

  const loginMutation = useMutation(login, {
    onSuccess: () => {
      query.refetch();
    },
  });

  const logOutMutation = useMutation(logOut, {
    onSuccess: () => {
      queryClient.setQueryData(authQueryKey, old => undefined);
    },
  });

  const loginFn = useCallback(
    (data: { email: string; password: string; remember: boolean }) =>
      loginMutation.mutateAsync(data),
    [loginMutation],
  );

  const logOutFn = useCallback(
    () => logOutMutation.mutateAsync(),
    [logOutMutation],
  );

  return {
    user: query.data,
    loginFn,
    logOutFn,
  };
});
