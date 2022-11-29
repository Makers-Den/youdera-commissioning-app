import { getCookie, setCookie } from 'cookies-next';

import { hasSecureLoginMethod, youderaApiInstance } from '../../api-instances/youdera';
import { DataResponse, LoginJWTResponse, UserInfo } from '../../apiTypes';
import { CookiesKeys } from '../../enums/cookiesKeys';

/**
 * This is used in dev and staging. 
 * It doesn't require the backend to be hosted under the same domain as the frontend.
 * It is less secure and shouldn't be used in production.
 */
const loginWithBearerToken = async ({
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

/**
 * This requires the frontend is served from the backend domain.
 * This is used in production.
 */
const loginWithSecureCookie = async ({
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
  hasSecureLoginMethod
    ? loginWithSecureCookie
    : loginWithBearerToken;

export const logOut = async () => {
  const response = await youderaApiInstance.get(`/auth/logout`);

  if (!hasSecureLoginMethod) {
    // clears out the bearer token interceptor
    youderaApiInstance.interceptors.request.clear();
  }

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


export interface UpdateUserAvatarArgs {
  image: File;
  setUploadProgress?: (percentage: number) => void;
}

export const updateUserAvatar = async ({
  image,
  setUploadProgress,
}: UpdateUserAvatarArgs) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('type', 'image');

  const response = await youderaApiInstance.post<DataResponse<{ link: string }>>(
    `/profile/avatar`,
    formData,
    {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      onUploadProgress(progressEvent) {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress?.(percentCompleted);
        }
      },
    },
  );

  return response.data.data;
};

export const deleteUserAvatar = () => youderaApiInstance.delete(`/profile/avatar`);