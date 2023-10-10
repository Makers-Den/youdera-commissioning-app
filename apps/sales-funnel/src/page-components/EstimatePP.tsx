import { Container } from '@src/components/container/Container';
import { useFlowStore } from '@src/store/flow';
import React from 'react';
import { H2, Label } from 'ui/typography/Typography';

export const EstimatePP = () => {
  const { next } = useFlowStore();
  return (
    <Container title="You can save 70 000 €">
      <div className="flex flex-col gap-3">
        <H2 weight="medium">How to pay for your system</H2>
        <div className="grid grid-cols-3">
          <div className="col-span-1 row-span-5 grid">
            <Label className="bg-gray-200 p-4 text-gray-600" weight="medium">
              Financing option
            </Label>
            <div className="flex h-14 items-center px-4">
              <Label className="text-gray-600">Net cost</Label>
            </div>
            <div className="flex h-14 items-center bg-gray-200 px-4">
              <Label className=" text-gray-600">Est. monthly payment</Label>
            </div>
            <div className="flex h-14 items-center px-4">
              <Label className="text-gray-600">Solar price per kWh</Label>
            </div>
            <div className="bg-brand-one-400 flex h-14 items-center px-4">
              <Label className=" text-white" weight="medium">
                Savings over 25 years
              </Label>
            </div>
          </div>
          <div className="bg-gray-1000 col-span-1 row-span-5 grid text-white">
            <Label className="text-brand-one-400 p-4" weight="medium">
              Power Purchase
            </Label>
            <div className="mx-4 flex h-14 items-center border-b border-white/10">
              <Label weight="medium">0 €</Label>
            </div>
            <div className="mx-4 flex h-14 items-center border-b border-white/10">
              <Label weight="medium">150 €</Label>
            </div>
            <div className="mx-4 flex h-14 items-center border-b border-white/10">
              <Label weight="medium">0,19 €</Label>
            </div>
            <div className="mx-4 flex h-14 items-center border-b border-white/10">
              <Label weight="medium">70 000 €</Label>
            </div>
          </div>
          <div className="col-span-1 row-span-5 grid bg-gray-300">
            <Label className="text-brand-one-400 p-4" weight="medium">
              Direct Purchase
            </Label>
            <div className="mx-4 flex h-14 items-center border-b border-black/10">
              <Label className="text-gray-1000" weight="medium">
                12 000 €
              </Label>
            </div>
            <div className="mx-4 flex h-14 items-center border-b border-black/10">
              <Label className=" text-gray-1000" weight="medium">
                0 €
              </Label>
            </div>
            <div className="mx-4 flex h-14 items-center border-b border-black/10">
              <Label className="text-gray-1000" weight="medium">
                0 €
              </Label>
            </div>
            <div className="mx-4 flex h-14 items-center border-b">
              <Label weight="medium" className="text-gray-1000">
                82 000 €
              </Label>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
