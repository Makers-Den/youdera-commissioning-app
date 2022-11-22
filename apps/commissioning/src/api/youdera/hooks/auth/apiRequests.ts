import { getCookie, setCookie } from 'cookies-next';

import { youderaApiInstance } from '../../api-instances/youdera';
import { LoginJWTResponse, UserInfo } from '../../apiTypes';
import { CookiesKeys } from '../../enums/cookiesKeys';

const loginJWT = async ({
  email,
  password,
  remember,
}: {
  email: string;
  password: string;
  remember: boolean;
}) => {
  const response = await youderaApiInstance.post<LoginJWTResponse>(`/login`, {
    email,
    password,
    remember,
  });

  const { data } = response;

  setCookie(CookiesKeys.accessToken, data.access_token);

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

export const login =
  process.env.NEXT_PUBLIC_YOUDERA_AUTH_METHOD === 'SESSION'
    ? loginSession
    : loginJWT;

export const logOut = async () => {
  const response = await youderaApiInstance.get(`/auth/logout`);
  return response.data;
};

export const getUserInfo = async () => {
  const response = await youderaApiInstance.get<UserInfo>(`/auth`);

  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await youderaApiInstance.post(`/auth/forgot-password`, {
    email,
  });
  return response.data;
};

export type ResetPasswordReqBody = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
};

export const resetPassword = async (body: ResetPasswordReqBody) => {
  const response = await youderaApiInstance.post(`/auth/reset-password`, {
    ...body,
    setMode: false,
  });
  return response.data;
};
