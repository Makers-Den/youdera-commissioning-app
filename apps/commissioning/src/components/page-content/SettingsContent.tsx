/* eslint-disable @next/next/no-img-element */
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInfo } from "@src/api/youdera/apiTypes";
import { updateUserAvatar } from "@src/api/youdera/hooks/auth/apiRequests";
import { useDeleteUserAvatarMutation, useUpdateUserAvatarMutation, useUpdateUserDetailsMutation, useUpdateUserPasswordMutation } from "@src/api/youdera/hooks/auth/hooks";
import { reportApiError } from "@src/utils/errorUtils";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { Box, BoxContent, BoxHeader, BoxTitle } from "ui/box/Box";
import { Button } from "ui/buttons/Button";
import { FileUploader } from "ui/file-inputs/FileUploader";
import { UploadFileFn, useFileUploader } from "ui/file-inputs/useFileUploader";
import { RoundImage } from "ui/image/RoundImage";
import { Input } from "ui/inputs/Input";
import { Profile } from "ui/svg-icons/icons/Profile";
import { SvgIcon } from "ui/svg-icons/SvgIcon";
import { Toast, useToast } from "ui/toast/Toast";
import { Typography } from "ui/typography/Typography";
import { z } from 'zod';

import { Field } from "../forms/Field";
import { Form } from "../forms/Form";

type SettingsSectionProps = {
  userInfo: UserInfo;
  className?: string;
}

const detailsValidation = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Invalid email")
  });

type DetailsFormValues = z.infer<typeof detailsValidation>;

const GeneralDetails = ({ userInfo, className }: SettingsSectionProps) => {
  const intl = useIntl();
  const [defaultValues, setDefaultValues] = useState<DetailsFormValues>({
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    email: userInfo.email
  });

  const toast = useToast();

  const formProps = useForm({
    resolver: zodResolver(detailsValidation),
    defaultValues,
  });

  const { handleSubmit, reset } = formProps;
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const updateUserDetailsMutation = useUpdateUserDetailsMutation();

  const onSubmit = useCallback(async (values: DetailsFormValues) => {
    try {
      const newUserInfo = await updateUserDetailsMutation.mutateAsync(values);
      setDefaultValues({
        firstName: newUserInfo.first_name,
        lastName: newUserInfo.last_name,
        email: newUserInfo.email
      });
      toast.success(intl.formatMessage({
        defaultMessage: 'Profile details saved.'
      }));
    } catch (err) {
      reportApiError(toast, err);
    }
  }, [updateUserDetailsMutation, toast, intl]);

  return (
    <Box className={className}>
      <BoxHeader>
        <BoxTitle
          title={intl.formatMessage({ defaultMessage: 'General details' })}
        />
      </BoxHeader>
      <BoxContent className="flex space-x-4">
        <Form {...formProps} onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
          <Field name="firstName">
            {(register, fieldState) => (
              <Input
                label={intl.formatMessage({
                  defaultMessage: 'First name',
                })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'John',
                })}
                className="w-full"
                {...register('firstName')}
                validity={fieldState.invalid ? 'invalid' : undefined}
              />
            )}
          </Field>
          <Field name="lastName">
            {(register, fieldState) => (
              <Input
                label={intl.formatMessage({
                  defaultMessage: 'Last name',
                })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Doe',
                })}
                className="w-full"
                {...register('lastName')}
                validity={fieldState.invalid ? 'invalid' : undefined}
              />
            )}
          </Field>
          <Field name="email">
            {(register, fieldState) => (
              <Input
                label={intl.formatMessage({
                  defaultMessage: 'Email',
                })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'john.doe@example.org',
                })}
                className="w-full"
                {...register('email')}
                validity={fieldState.invalid ? 'invalid' : undefined}
              />
            )}
          </Field>
          <Button variant="main-green" className="mt-3 w-[160px]" type="submit" disabled={!formProps.formState.isDirty}>
            {intl.formatMessage({ defaultMessage: 'Save' })}
          </Button>
        </Form>
      </BoxContent>
    </Box>
  );
}

const passwordValidation = z
  .object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmNewPassword: z.string().min(6),
  }).superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        path: ['confirmNewPassword'],
        code: 'custom',
        message: 'The passwords did not match'
      });
    }
  });

type PasswordFormValues = z.infer<typeof passwordValidation>;

const ChangePassword = ({ className }: SettingsSectionProps) => {
  const intl = useIntl();
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const toast = useToast();

  const formProps = useForm({
    resolver: zodResolver(passwordValidation),
    defaultValues,
  });

  const { handleSubmit, reset } = formProps;

  const updateUserPasswordMutation = useUpdateUserPasswordMutation();

  const onSubmit = useCallback(async ({ newPassword, oldPassword }: PasswordFormValues) => {
    try {
      await updateUserPasswordMutation.mutateAsync({ newPassword, oldPassword });
      toast.success(intl.formatMessage({
        defaultMessage: 'Password updated.'
      }));
      reset();
    } catch (err) {
      reportApiError(toast, err);
    }
  }, [updateUserPasswordMutation, toast, intl, reset]);

  return (
    <Box className={className}>
      <BoxHeader>
        <BoxTitle
          title={intl.formatMessage({ defaultMessage: 'Change password' })}
        />
      </BoxHeader>
      <BoxContent className="flex space-x-4">
        <Form {...formProps} onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
          <Field name="oldPassword">
            {(register, fieldState) => (
              <Input
                label={intl.formatMessage({
                  defaultMessage: 'Current password',
                })}
                type="password"
                className="w-full"
                {...register('oldPassword')}
                validity={fieldState.invalid ? 'invalid' : undefined}
              />
            )}
          </Field>
          <Field name="newPassword">
            {(register, fieldState) => (
              <Input
                label={intl.formatMessage({
                  defaultMessage: 'New password',
                })}
                type="password"
                className="w-full"
                {...register('newPassword')}
                validity={fieldState.invalid ? 'invalid' : undefined}
              />
            )}
          </Field>
          <Field name="confirmNewPassword">
            {(register, fieldState) => (
              <Input
                label={intl.formatMessage({
                  defaultMessage: 'Repeat new password',
                })}
                type="password"
                className="w-full"
                {...register('confirmNewPassword')}
                validity={fieldState.invalid ? 'invalid' : undefined}
              />
            )}
          </Field>
          <Button variant="main-green" className="mt-3 w-[160px]" type="submit" disabled={!formProps.formState.isDirty}>
            {intl.formatMessage({ defaultMessage: 'Save' })}
          </Button>
        </Form>
      </BoxContent>
    </Box>
  );
}

function isPlaceholderImage(imgSrc: string) {
  return imgSrc.endsWith("youdera-logo.svg");
}

export const ChangeAvatar = ({ userInfo, className }: SettingsSectionProps) => {
  const intl = useIntl();
  const toast = useToast();
  const imgSrc = (userInfo.avatar && !isPlaceholderImage(userInfo.avatar))
    ? userInfo.avatar
    : undefined;

  const updateUserAvatarMutation = useUpdateUserAvatarMutation();
  const deleteUserAvatarMutation = useDeleteUserAvatarMutation();

  const uploadFile: UploadFileFn = useCallback(async (
    event,
    setUploadPercentageProgress,
    setUploadedUrl,
  ) => {
    const file = event.currentTarget.files![0];
    try {
      const response = await updateUserAvatarMutation.mutateAsync({
        image: file,
        setUploadProgress: setUploadPercentageProgress,
      });

      setUploadedUrl(response.link);
      toast.success(
        intl.formatMessage({
          defaultMessage: 'Avatar updated.',
        }),
      );
    } catch (err) {
      reportApiError(toast, err);
    }
  }, [intl, toast, updateUserAvatarMutation]);

  const { fileUploaderProps } = useFileUploader({ uploadFile })

  return (
    <Box className={className}>
      <BoxHeader>
        <BoxTitle
          title={intl.formatMessage({ defaultMessage: 'Change avatar' })}
        />
      </BoxHeader>
      <BoxContent className="flex space-x-4">
        <div className="w-24 h-20 relative">

          {imgSrc && (
            <>
              <RoundImage src={imgSrc} alt="avatar" wrapperClassName="w-20 h-20 border" />
              <SvgIcon
                className="cursor-pointer absolute top-0 right-0"
                name="Trashbin"
                onClick={async () => {
                  try {
                    await deleteUserAvatarMutation.mutateAsync();
                    toast.success(intl.formatMessage({ defaultMessage: 'Removed avatar.' }));
                  } catch (err) {
                    reportApiError(toast, err);
                  }
                }}
              />
            </>
          )}
          {!imgSrc && <Profile className="w-20 h-20" />}
        </div>
        <FileUploader
          wrapperClassname="w-full flex-1" className="w-full"
          accept="image/*"
          {...fileUploaderProps}
        >
          <div className="flex flex-1 w-full items-center justify-start gap-4">
            <SvgIcon name="Camera" className="w-8 text-green-400" />
            <div>
              <Typography>
                {intl.formatMessage({
                  defaultMessage: 'To replace your avatar take a photo with your camera',
                })}
              </Typography>
              <Typography>
                {intl.formatMessage({
                  defaultMessage: 'or',
                })}{' '}
                <span className="text-green-400 underline">
                  {intl.formatMessage({
                    defaultMessage: 'click here to upload an image',
                  })}
                </span>
              </Typography>
            </div>
          </div>
        </FileUploader>
      </BoxContent>
    </Box>
  );
}

export const SettingsContent = ({ userInfo }: { userInfo: UserInfo }) => (
  <div className="flex-1 flex flex-col gap-5 w-full h-full max-w-2xl justify-start">
    <div className="flex flex-row gap-5">
      <GeneralDetails userInfo={userInfo} className="flex-1" />
      <ChangePassword userInfo={userInfo} className="flex-1" />
    </div>
    <ChangeAvatar userInfo={userInfo} className="w-full" />
    <Toast />
  </div>
);

