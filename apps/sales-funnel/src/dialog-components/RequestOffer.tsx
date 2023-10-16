import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent, DialogHeader } from '@src/components/dialog/Dialog';
import { CheckboxField } from '@src/components/forms/CheckboxField';
import { Form } from '@src/components/forms/Form';
import { InputField } from '@src/components/forms/InputField';
import { SelectField } from '@src/components/forms/SelectField';
import { useFlowStore } from '@src/store/flow';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { SelectOption } from 'ui/select/Select';
import { BodyText, H1 } from 'ui/typography/Typography';
import { z } from 'zod';

const RequestOfferSchema = z.object({
  title: z.object({ key: z.string(), label: z.string() }),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  newsletter: z.boolean(),
});

type RequestOfferType = z.infer<typeof RequestOfferSchema>;

export const RequestOffer = () => {
  const intl = useIntl();

  const titleOptions = [
    {
      key: 'mr',
      label: intl.formatMessage({
        defaultMessage: 'Mr.',
      }),
    },
    {
      key: 'mrs',
      label: intl.formatMessage({
        defaultMessage: 'Mrs.',
      }),
    },
    {
      key: 'ms',
      label: intl.formatMessage({
        defaultMessage: 'Ms.',
      }),
    },
    {
      key: 'dr',
      label: intl.formatMessage({
        defaultMessage: 'Dr.',
      }),
    },
    {
      key: 'prof',
      label: intl.formatMessage({
        defaultMessage: 'Prof.',
      }),
    },
  ];

  const { next, setData, data } = useFlowStore();
  const methods = useForm<RequestOfferType>({
    resolver: zodResolver(RequestOfferSchema),
    defaultValues: {
      email: data.requestOffer?.email,
      firstName: data.requestOffer?.firstName,
      lastName: data.requestOffer?.lastName,
      newsletter: data.requestOffer?.newsletter || false,
      phoneNumber: data.requestOffer?.phoneNumber,
      title: titleOptions.find(
        option => option.key === data.requestOffer?.title,
      ),
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<RequestOfferType> = async formData => {
    const { title, email, firstName, lastName, newsletter, phoneNumber } =
      formData;

    setData({
      requestOffer: {
        ...(data?.requestOffer || {}),
        title: title.key,
        firstName,
        lastName,
        email,
        phoneNumber,
        newsletter,
      },
    });
    next();
  };
  return (
    <>
      <DialogHeader>
        <H1>
          {intl.formatMessage({
            defaultMessage: 'Request Offer',
          })}
        </H1>
      </DialogHeader>
      <DialogContent className="flex flex-1 flex-col">
        <BodyText>
          {intl.formatMessage({
            defaultMessage:
              'Get a PDF of your offer as well as a link to your saved offer and estimate',
          })}
        </BodyText>
        <Form
          className="flex flex-1 flex-col justify-between"
          onSubmit={handleSubmit(onSubmit)}
          {...methods}
        >
          <div className="mt-6 flex flex-col gap-4">
            <SelectField name="title" placeholder="Select title" label="Title">
              {titleOptions.map(value => (
                <SelectOption value={value}>{() => value.label}</SelectOption>
              ))}
            </SelectField>
            <div className="flex gap-4">
              <InputField
                name="firstName"
                label={intl.formatMessage({
                  defaultMessage: 'First name',
                })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'E.g. John',
                })}
              />
              <InputField
                name="lastName"
                label={intl.formatMessage({
                  defaultMessage: 'Last name',
                })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'E.g. Smith',
                })}
              />
            </div>
            <InputField
              name="email"
              label={intl.formatMessage({
                defaultMessage: 'Email',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'E.g. john@example.org',
              })}
            />
            <InputField
              name="phoneNumber"
              label={intl.formatMessage({
                defaultMessage: 'Phone number',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'E.g. +49 170 1919123',
              })}
            />
            <CheckboxField
              name="newsletter"
              label={intl.formatMessage({
                defaultMessage: 'I want to subscribe to the newsletter',
              })}
              className="bg-brand-one-400 mt-2"
            />
          </div>
          <Button type="submit" className="mt-11">
            {intl.formatMessage({
              defaultMessage: 'Submit',
            })}
          </Button>
        </Form>
      </DialogContent>
    </>
  );
};
