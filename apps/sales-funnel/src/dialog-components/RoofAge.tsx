import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent, DialogHeader } from '@src/components/dialog/Dialog';
import { Form } from '@src/components/forms/Form';
import { RadioGroupField } from '@src/components/forms/RadioGroupField';
import { useFlowStore } from '@src/store/flow';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'ui/buttons/Button';
import { BodyText, H1, NoteText } from 'ui/typography/Typography';
import { z } from 'zod';

const roofAgeOptions = [
  { name: 'Before 1990', value: 'before 1990' },
  { name: 'After 1990', value: 'after 1990' },
  { name: 'Newly built', value: 'newly built' },
  { name: 'In planning', value: 'in planning' },
  { name: "I don't know", value: "i don't know" },
];

const RoofAgeSchema = z.object({
  roofAge: z.string(),
});

type RoofAgeType = z.infer<typeof RoofAgeSchema>;

export const RoofAge = () => {
  const { back, next, setData, data } = useFlowStore();
  const methods = useForm<RoofAgeType>({
    resolver: zodResolver(RoofAgeSchema),
    defaultValues: {
      roofAge: data.requestOffer?.roofAge,
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<RoofAgeType> = async formData => {
    const { roofAge } = formData;
    setData({
      requestOffer: {
        ...(data?.requestOffer || {}),
        roofAge,
      },
    });
    next();
  };
  return (
    <>
      <DialogHeader>
        <H1>Roof Age</H1>
      </DialogHeader>
      <DialogContent>
        <BodyText>
          For a more accurate offer we have just few more questions.
        </BodyText>
        <Form
          className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
          {...methods}
        >
          <RadioGroupField
            options={roofAgeOptions}
            name="roofAge"
            label="When was your roof built (or renovated)?"
            className="mb-4 mt-11"
          />
          <NoteText>
            Roof age can tell us what materials can be found within the roof.
          </NoteText>
          <Button type="submit" className="mt-11">
            Next
          </Button>
          <Button
            type="button"
            onClick={back}
            variant="additional-white"
            className="mt-3"
          >
            Back
          </Button>
        </Form>
      </DialogContent>
    </>
  );
};
