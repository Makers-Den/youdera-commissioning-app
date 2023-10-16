import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent, DialogHeader } from '@src/components/dialog/Dialog';
import { Form } from '@src/components/forms/Form';
import { RadioGroupField } from '@src/components/forms/RadioGroupField';
import { useFlowStore } from '@src/store/flow';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { H1 } from 'ui/typography/Typography';
import { z } from 'zod';

const TimeframeSchema = z.object({
  timeframe: z.string(),
});

type TimeframeType = z.infer<typeof TimeframeSchema>;

export const Timeframe = () => {
  const intl = useIntl();
  const timeframeOptions = [
    {
      name: intl.formatMessage({
        defaultMessage: 'As soon as possible',
      }),
      value: 'asap',
    },
    {
      name: intl.formatMessage({
        defaultMessage: 'In 1-3 months',
      }),
      value: 'in 1-3 months',
    },
    {
      name: intl.formatMessage({
        defaultMessage: 'In 3-6 months',
      }),
      value: 'in 3-6 months',
    },
    {
      name: intl.formatMessage({
        defaultMessage: 'In 6-12 months',
      }),
      value: 'in 6-12 months',
    },
    {
      name: intl.formatMessage({
        defaultMessage: 'In 12 months or later',
      }),
      value: 'in 12 months or later',
    },
  ];

  const { back, next, setData, data } = useFlowStore();
  const methods = useForm<TimeframeType>({
    resolver: zodResolver(TimeframeSchema),
    defaultValues: {
      timeframe: data.requestOffer?.timeframe,
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<TimeframeType> = async formData => {
    const { timeframe } = formData;
    setData({
      requestOffer: {
        ...(data?.requestOffer || {}),
        timeframe,
      },
    });
    next();
  };
  return (
    <>
      <DialogHeader>
        <H1>
          {intl.formatMessage({
            defaultMessage: 'Timeframe',
          })}
        </H1>
      </DialogHeader>
      <DialogContent className="flex flex-1 flex-col">
        <Form
          className="flex flex-1 flex-col justify-between"
          onSubmit={handleSubmit(onSubmit)}
          {...methods}
        >
          <RadioGroupField
            options={timeframeOptions}
            name="timeframe"
            label={intl.formatMessage({
              defaultMessage: 'In which timeframe would you like to install?',
            })}
          />
          <div className="mt-auto flex flex-col gap-3 pt-11">
            <Button type="submit">
              {intl.formatMessage({
                defaultMessage: 'Next',
              })}
            </Button>
            <Button type="button" onClick={back} variant="additional-white">
              {intl.formatMessage({
                defaultMessage: 'Back',
              })}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </>
  );
};
