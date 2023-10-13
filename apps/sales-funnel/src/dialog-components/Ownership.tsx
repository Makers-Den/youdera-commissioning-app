import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent, DialogHeader } from '@src/components/dialog/Dialog';
import { Form } from '@src/components/forms/Form';
import { RadioGroupField } from '@src/components/forms/RadioGroupField';
import { useFlowStore } from '@src/store/flow';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'ui/buttons/Button';
import { H1, NoteText } from 'ui/typography/Typography';
import { z } from 'zod';

const ownershipOptions = [
  { name: 'I am the owner of the house', value: 'owner' },
  { name: 'I am renting the house', value: 'tenant' },
];

const OwnershipSchema = z.object({
  ownership: z.string(),
});

type OwnershipType = z.infer<typeof OwnershipSchema>;

export const Ownership = () => {
  const { back, next, setData, data } = useFlowStore();
  const methods = useForm<OwnershipType>({
    resolver: zodResolver(OwnershipSchema),
    defaultValues: {
      ownership: data.requestOffer?.ownership,
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<OwnershipType> = async formData => {
    const { ownership } = formData;
    setData({
      requestOffer: {
        ...(data?.requestOffer || {}),
        ownership,
      },
    });
    next();
  };
  return (
    <>
      <DialogHeader>
        <H1>Ownership</H1>
      </DialogHeader>
      <DialogContent className="flex-1">
        <Form
          className="flex flex-1 flex-col justify-between"
          onSubmit={handleSubmit(onSubmit)}
          {...methods}
        >
          <div className="flex flex-col">
            <RadioGroupField
              options={ownershipOptions}
              name="ownership"
              label="Do you own or rent your house?"
            />
            <NoteText className="mt-4">
              Knowing if you are the owner of the roof or not informs us about
              contractual parties that need to be contacted.
            </NoteText>
          </div>
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
