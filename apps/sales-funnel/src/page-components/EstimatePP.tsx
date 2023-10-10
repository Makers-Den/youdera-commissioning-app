import { Container } from '@src/components/container/Container';
import { useFlowStore } from '@src/store/flow';
import React from 'react';
import { Button } from 'ui/buttons/Button';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { BodyText, H2, Label, NoteText } from 'ui/typography/Typography';

export const EstimatePP = () => {
  const { next } = useFlowStore();
  return (
    <Container title="You can save 70 000 €" clippedTitle>
      {/* Color of the text */}
      <div className="bg-gray-1000 flex flex-col gap-6 text-gray-300">
        <div className="flex items-center justify-between">
          <H2 weight="medium">Your Solar System</H2>

          <Button variant="main-gray">
            <SvgIcon name="Wrench" className="mr-4" />
            Modify System
          </Button>
        </div>
        <div className="flex gap-2">
          <Label>Standard equipment tier</Label>
          <button type="button">
            <SvgIcon name="Info" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6 border-b border-current pb-4">
          <div className="flex items-center gap-4">
            <BodyText>22x</BodyText>
            <div className="flex flex-col items-center gap-1">
              <SvgIcon name="SolarPanelAlt" className="text-brand-one-400" />
              <NoteText>410W</NoteText>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <BodyText>1x</BodyText>
            <div className="flex flex-col items-center gap-1">
              <SvgIcon name="BatteryAlt" className="text-brand-one-400" />
              <NoteText>1,6 kWh</NoteText>
            </div>
          </div>
        </div>
        <div className="b-4 grid grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <SvgIcon name="Lightning" />
            <div className="flex flex-col ">
              <Label>Yearly output</Label>
              <div className="flex gap-2">
                <BodyText>9500 kWh</BodyText>
                <button type="button">
                  <SvgIcon name="Info" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SvgIcon name="MeterAlt" />
            <div className="flex flex-col ">
              <Label>System power</Label>
              <div className="flex gap-2">
                <BodyText>9,0 kWp</BodyText>
                <button type="button">
                  <SvgIcon name="Info" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SvgIcon name="Coverage" />
            <div className="flex flex-col ">
              <Label>Own energy usage coverage</Label>
              <BodyText>48%</BodyText>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <SvgIcon name="Leaf" />
            <div className="flex flex-col ">
              <Label>CO2 saved per year</Label>
              <BodyText>25 000 kg</BodyText>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-4">
          <H2 weight="medium">How to pay for your system</H2>
          <SvgIcon name="Savings" />
        </div>
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
            <div className="flex gap-2 p-4">
              <BodyText className="text-brand-one-400" weight="medium">
                Power Purchase
              </BodyText>
              <button type="button">
                <SvgIcon name="Info" className="h-5 w-5" />
              </button>
            </div>
            <div className="mx-4 flex  h-14 items-center gap-2 border-b border-white/10">
              <BodyText weight="medium">0 €</BodyText>
              <button type="button">
                <SvgIcon name="Info" />
              </button>
            </div>
            <div className="mx-4 flex  h-14 items-center gap-2 border-b border-white/10">
              <BodyText weight="medium">150 €</BodyText>
              <button type="button">
                <SvgIcon name="Info" />
              </button>
            </div>
            <div className="mx-4 flex  h-14 items-center gap-2 border-b border-white/10">
              <BodyText weight="medium">0,19 €</BodyText>
              <button type="button">
                <SvgIcon name="Info" />
              </button>
            </div>
            <div className="mx-4 flex  h-14 items-center gap-2 border-b border-white/10">
              <BodyText weight="medium">70 000 €</BodyText>
              <button type="button">
                <SvgIcon name="Info" />
              </button>
            </div>
          </div>
          <div className="col-span-1 row-span-5 grid bg-gray-300">
            <div className="flex gap-2 p-4">
              <BodyText className="text-brand-one-400" weight="medium">
                Direct Purchase
              </BodyText>
              <button type="button">
                <SvgIcon name="Info" className="h-5 w-5" />
              </button>
            </div>
            <div className="mx-4 flex h-14 items-center gap-2 border-b border-black/10">
              <BodyText className="text-gray-1000" weight="medium">
                12 000 €
              </BodyText>
              <button type="button">
                <SvgIcon name="Info" />
              </button>
            </div>
            <div className="mx-4 flex h-14 items-center gap-2 border-b border-black/10">
              <BodyText className=" text-gray-1000" weight="medium">
                0 €
              </BodyText>
              <button type="button">
                <SvgIcon name="Info" />
              </button>
            </div>
            <div className="mx-4 flex h-14 items-center gap-2 border-b border-black/10">
              <BodyText className="text-gray-1000" weight="medium">
                0 €
              </BodyText>
              <button type="button">
                <SvgIcon name="Info" />
              </button>
            </div>
            <div className="mx-4 flex h-14 items-center gap-2">
              <BodyText weight="medium" className="text-gray-1000">
                82 000 €
              </BodyText>
              <button type="button">
                <SvgIcon name="Info" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
