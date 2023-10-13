import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent, DialogHeader } from '@src/components/dialog/Dialog';
import { Form } from '@src/components/forms/Form';
import { PillsRadioGroupField } from '@src/components/forms/PillsRadioGroupField';
import { RadioGroupField } from '@src/components/forms/RadioGroupField';
import { SliderField } from '@src/components/forms/SliderField';
import { ToggleField } from '@src/components/forms/ToggleField';
import { useFlowStore } from '@src/store/flow';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { Info } from 'ui/svg-icons/icons/Info';
import { BodyText, H1, Label, NoteText } from 'ui/typography/Typography';
import { z } from 'zod';

export enum EquipmentTier {
  Value = 'Value',
  Standard = 'Standard',
  Premium = 'Premium',
}

const ModifySystemSchema = z.object({
  equipmentTier: z.nativeEnum(EquipmentTier),
  solarBatteryIncluded: z.boolean(),
  solarPanelQuantity: z.number(),
});

type ModifySystemType = z.infer<typeof ModifySystemSchema>;

export type ModifySystemProps = {
  onSubmit: (data: ModifySystemType) => void;
  onCancel: () => void;
};

export const ModifySystem = ({ onCancel, onSubmit }: ModifySystemProps) => {
  const intl = useIntl();

  const methods = useForm<ModifySystemType>({
    // TODO: we probably will get the range from the backend so the validation has to be dynamic
    resolver: zodResolver(ModifySystemSchema),
    defaultValues: {
      // TODO: this will be populated from the backend
      equipmentTier: EquipmentTier.Value,
      solarPanelQuantity: 20,
      solarBatteryIncluded: false,
    },
  });
  const { handleSubmit, watch } = methods;

  const equipmentTier = watch('equipmentTier');

  const solarPanelQuantity = watch('solarPanelQuantity');

  const radioOptions = [
    {
      name: intl.formatMessage({ defaultMessage: 'Value' }),
      value: EquipmentTier.Value,
    },
    {
      name: intl.formatMessage({ defaultMessage: 'Standard' }),
      value: EquipmentTier.Standard,
    },
    {
      name: intl.formatMessage({ defaultMessage: 'Premium' }),
      value: EquipmentTier.Premium,
    },
  ];

  const selectedEquipmentTier = radioOptions.find(
    ({ value }) => value === equipmentTier,
  )?.name;

  return (
    <>
      <DialogHeader>
        <H1>{intl.formatMessage({ defaultMessage: 'Modify System' })}</H1>
      </DialogHeader>
      <DialogContent>
        <Form
          className="flex flex-1 flex-col justify-between gap-5"
          onSubmit={handleSubmit(onSubmit)}
          {...methods}
        >
          <PillsRadioGroupField
            name="equipmentTier"
            label={
              <Label className="flex">
                {intl.formatMessage({
                  defaultMessage: 'Selected equipment tier',
                })}
                <Info className="ml-1 h-5 w-5 text-gray-800" />
              </Label>
            }
            options={radioOptions}
          />
          <div>
            <Label>
              {intl.formatMessage({
                defaultMessage: 'Solar battery included',
              })}
            </Label>
            <ToggleField name="solarBatteryIncluded" />
          </div>
          <div>
            <Label className="flex items-center gap-2">
              {intl.formatMessage({ defaultMessage: 'Equipment Type' })}
              <NoteText className="text-gray-600">
                ({selectedEquipmentTier})
              </NoteText>
            </Label>
            <BodyText className="font-medium">
              This will come from backend
            </BodyText>
          </div>
          <div>
            <SliderField
              min={0}
              max={60}
              label={
                <>
                  <Label>
                    {intl.formatMessage({ defaultMessage: 'Solar panels' })}
                  </Label>
                  <BodyText className="font-medium">
                    {solarPanelQuantity}
                    <NoteText className="text-gray-600">35 m2</NoteText>
                  </BodyText>
                </>
              }
              name="solarPanelQuantity"
            />
            <NoteText className="text-gray-600">Backend Text</NoteText>
          </div>
          <div>
            <Label>
              {intl.formatMessage({ defaultMessage: 'System power' })}
            </Label>
            <BodyText className="font-medium">
              This will come from backend
            </BodyText>
          </div>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Button type="submit">
              {intl.formatMessage({ defaultMessage: 'APPLY CHANGES' })}
            </Button>
            <Button type="button" onClick={onCancel} variant="additional-white">
              Back
            </Button>
          </div>
        </Form>
      </DialogContent>
    </>
  );
};
