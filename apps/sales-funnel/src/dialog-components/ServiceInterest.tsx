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

const serviceInterestOptions = [
  {
    name: 'Power Purchase',
    description:
      'Sign an energy service contract with Younergy. We invest and maintain the solar system. You pay only for the energy it produces',
    value: 'power purchase',
  },
  {
    name: 'Direct Purchase',
    description:
      'The more traditional way of going solar, pay for the system upfront and get free electricity for the coming years)',
    value: 'direct purchase',
  },
  { name: "I'm not sure yet", value: 'not sure' },
];

const ServiceInterestSchema = z.object({
  serviceInterest: z.string(),
});

type ServiceInterestType = z.infer<typeof ServiceInterestSchema>;

export const ServiceInterest = () => {
  const { back, next, setData, data } = useFlowStore();
  const methods = useForm<ServiceInterestType>({
    resolver: zodResolver(ServiceInterestSchema),
    defaultValues: {
      serviceInterest: data.requestOffer?.serviceInterest,
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ServiceInterestType> = async formData => {
    const { serviceInterest } = formData;
    setData({
      requestOffer: {
        ...(data?.requestOffer || {}),
        serviceInterest,
      },
    });
    next();
  };
  return (
    <>
      <DialogHeader>
        <H1>Service Interest</H1>
      </DialogHeader>
      <DialogContent className="flex flex-1 flex-col">
        <Form
          className="flex flex-1 flex-col justify-between"
          onSubmit={handleSubmit(onSubmit)}
          {...methods}
        >
          <RadioGroupField
            options={serviceInterestOptions}
            name="serviceInterest"
            label="How would you prefer to pay for the system?"
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
