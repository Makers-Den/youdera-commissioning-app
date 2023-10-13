import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent, DialogHeader } from '@src/components/dialog/Dialog';
import { Form } from '@src/components/forms/Form';
import { RadioGroupField } from '@src/components/forms/RadioGroupField';
import { useFlowStore } from '@src/store/flow';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'ui/buttons/Button';
import { H1 } from 'ui/typography/Typography';
import { z } from 'zod';

const timeframeOptions = [
  { name: 'As soon as possible', value: 'asap' },
  { name: 'In 1-3 months', value: 'in 1-3 months' },
  { name: 'In 3-6 months', value: 'in 3-6 months' },
  { name: 'In 6-12 months', value: 'in 6-12 months' },
  { name: 'In 12 months or later', value: 'in 12 months or later' },
];

const TimeframeSchema = z.object({
  timeframe: z.string(),
});

type TimeframeType = z.infer<typeof TimeframeSchema>;

export const Timeframe = () => {
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
        <H1>Timeframe</H1>
      </DialogHeader>
      <DialogContent className="flex-1">
        <Form
          className="flex flex-1 flex-col justify-between"
          onSubmit={handleSubmit(onSubmit)}
          {...methods}
        >
          <RadioGroupField
            options={timeframeOptions}
            name="timeframe"
            label="In which timeframe would you like to install?"
          />
          <div className="mt-auto flex flex-col gap-3 pt-11">
            <Button type="submit">Next</Button>
            <Button type="button" onClick={back} variant="additional-white">
              Back
            </Button>
          </div>
        </Form>
      </DialogContent>
    </>
  );
};
