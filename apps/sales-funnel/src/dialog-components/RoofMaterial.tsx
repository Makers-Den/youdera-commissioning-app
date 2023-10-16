import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent, DialogHeader } from '@src/components/dialog/Dialog';
import { BoxesRadioGroupField } from '@src/components/forms/BoxesRadioGroupField';
import { Form } from '@src/components/forms/Form';
import { useFlowStore } from '@src/store/flow';
import Image from 'next/image';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { Option as BoxesRadioGroupOption } from 'ui/radio-group/BoxesRadioGroup';
import { H1 } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z } from 'zod';

import TileImage from '../../public/TilesImage.webp';

const TileElement = () => (
  <div className="relative h-20 w-full">
    <Image src={TileImage.src} alt="Tile Image" fill className="object-cover" />
  </div>
);

const RoofMaterialSchema = z.object({
  roofMaterial: z.string(),
});

type RoofMaterialType = z.infer<typeof RoofMaterialSchema>;

export const RoofMaterial = () => {
  const intl = useIntl();
  const roofAgeOptions: BoxesRadioGroupOption<any>[] = [
    {
      name: intl.formatMessage({
        defaultMessage: 'Reform tiles',
      }),
      value: 'reform tiles',
      element: <TileElement />,
    },
    {
      name: intl.formatMessage({
        defaultMessage: 'Waves tiles',
      }),
      value: 'waves tiles',
      element: <TileElement />,
    },
    {
      name: intl.formatMessage({
        defaultMessage: 'Stone slate',
      }),
      value: 'stone slate',
      element: <TileElement />,
    },
    {
      name: intl.formatMessage({
        defaultMessage: 'Flat tiles',
      }),
      value: 'flat tiles',
      element: <TileElement />,
    },
    {
      name: intl.formatMessage({
        defaultMessage: 'Metal trapez',
      }),
      value: 'metal trapez',
      element: <TileElement />,
    },
  ];

  const { back, next, setData, data } = useFlowStore();
  const methods = useForm<RoofMaterialType>({
    resolver: zodResolver(RoofMaterialSchema),
    defaultValues: {
      roofMaterial: data.requestOffer?.roofMaterial,
    },
  });
  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<RoofMaterialType> = async formData => {
    const { roofMaterial } = formData;
    setData({
      requestOffer: {
        ...(data?.requestOffer || {}),
        roofMaterial,
      },
    });
    next();
  };
  return (
    <>
      <DialogHeader>
        <H1>
          {intl.formatMessage({
            defaultMessage: 'Roof Material',
          })}
        </H1>
      </DialogHeader>
      <DialogContent className="flex flex-1 flex-col">
        <Form
          className="flex flex-1 flex-col justify-between"
          onSubmit={handleSubmit(onSubmit)}
          {...methods}
        >
          <BoxesRadioGroupField
            options={roofAgeOptions}
            name="roofMaterial"
            label={intl.formatMessage({
              defaultMessage: 'What is the primary material of your roof?',
            })}
            className="mt-11 grid-cols-2 "
            optionClassName={checked =>
              clsxm(
                'p-0 overflow-hidden rounded-sm items-start border-2 gap-0',
                checked ? 'border-brand-one-400' : 'border-transparent',
              )
            }
            labelClassName="text-left ml-1 my-1"
          />
          <div className="mt-11 flex flex-col">
            <Button type="submit">
              {intl.formatMessage({
                defaultMessage: 'Next',
              })}
            </Button>
            <Button
              type="button"
              onClick={back}
              variant="additional-white"
              className="mt-3"
            >
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
