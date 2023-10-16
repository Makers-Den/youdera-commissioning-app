import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent, DialogHeader } from '@src/components/dialog/Dialog';
import { Form } from '@src/components/forms/Form';
import { TextAreaField } from '@src/components/forms/TextAreaField';
import { useFlowStore } from '@src/store/flow';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { BodyText, H1 } from 'ui/typography/Typography';
import { z } from 'zod';

const NotesSchema = z.object({
  notes: z.string().optional(),
});

type NotesType = z.infer<typeof NotesSchema>;

export const Notes = () => {
  const intl = useIntl();
  const { back, next, setData, data } = useFlowStore();
  const methods = useForm<NotesType>({
    resolver: zodResolver(NotesSchema),
    defaultValues: {
      notes: data.requestOffer?.notes,
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<NotesType> = async formData => {
    const { notes } = formData;
    setData({
      requestOffer: {
        ...(data?.requestOffer || {}),
        notes,
      },
    });
    next();
  };
  return (
    <>
      <DialogHeader>
        <H1>
          {intl.formatMessage({
            defaultMessage: 'Notes',
          })}
        </H1>
      </DialogHeader>
      <DialogContent className="flex flex-1 flex-col">
        <Form
          className="flex flex-1 flex-col justify-between"
          onSubmit={handleSubmit(onSubmit)}
          {...methods}
        >
          <div className="flex flex-col gap-6">
            <BodyText>
              Is there something else you’d would like to relay to us as
              information?
            </BodyText>
            <TextAreaField label="Notes" name="notes" />
          </div>
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
