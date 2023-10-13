/* eslint-disable @typescript-eslint/no-use-before-define */
import { LayoutContainer } from '@src/components/container/LayoutContainer';
import { Dialog } from '@src/components/dialog/Dialog';
import { SavingsGraph } from '@src/components/graphs/SavingsGraph';
import { RecoupSvg } from '@src/components/svgs/RecoupSvg';
import { Notes } from '@src/dialog-components/Notes';
import { Ownership } from '@src/dialog-components/Ownership';
import { RequestOffer } from '@src/dialog-components/RequestOffer';
import { RoofAge } from '@src/dialog-components/RoofAge';
import { RoofMaterial } from '@src/dialog-components/RoofMaterial';
import { ServiceInterest } from '@src/dialog-components/ServiceInterest';
import { ThankYou } from '@src/dialog-components/ThankYou';
import { Timeframe } from '@src/dialog-components/Timeframe';
import { useFlowStore, ViewNames } from '@src/store/flow';
import Image from 'next/image';
import React from 'react';
import { Button } from 'ui/buttons/Button';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import {
  BodyText,
  H1,
  H2,
  H3,
  Label,
  NoteText,
} from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

import EstimateIllustration from '../../public/EstimateIllustration.webp';

export const EstimatePP = () => {
  const { currentView, setCurrentView } = useFlowStore();
  const requestFlowViews: ViewNames[] = [
    'requestOffer',
    'roofAge',
    'roofMaterial',
    'ownership',
    'timeframe',
    'serviceInterest',
    'notes',
    'thankYou',
  ];
  const isRequestFlow = requestFlowViews.includes(currentView);
  const [isRequestDialogOpened, setIsRequestDialogOpened] =
    React.useState(isRequestFlow);

  const openRequestDialog = () => {
    //TODO reset all the requestOfferFlow data (after we finish all views and add all the relevant data fields)
    setCurrentView('requestOffer');
    setIsRequestDialogOpened(true);
  };

  const closeRequestDialog = () => setIsRequestDialogOpened(false);

  return (
    <LayoutContainer
      title="You can save 70 000 €"
      clippedTitle
      leftSection={<LeftSection openRequestDialog={openRequestDialog} />}
    >
      <div className="-mt-4 justify-start gap-0">
        <SystemDetailsSection />
        <SavingsSection />
        <SavingsGraph />
        <RequestButtons openRequestDialog={openRequestDialog} />
      </div>
      <Dialog open={isRequestDialogOpened} onClose={closeRequestDialog}>
        {currentView === 'requestOffer' && <RequestOffer />}
        {currentView === 'roofAge' && <RoofAge />}
        {currentView === 'roofMaterial' && <RoofMaterial />}
        {currentView === 'ownership' && <Ownership />}
        {currentView === 'timeframe' && <Timeframe />}
        {currentView === 'serviceInterest' && <ServiceInterest />}
        {currentView === 'notes' && <Notes />}
        {currentView === 'thankYou' && <ThankYou />}
      </Dialog>
    </LayoutContainer>
  );
};

const LeftSection = ({
  openRequestDialog,
}: {
  openRequestDialog: () => void;
}) => (
  <>
    <Image
      fill
      className="object-cover object-right-bottom"
      alt="Home with solar panels"
      sizes="50vw"
      src={EstimateIllustration.src}
    />
    <div className="containerPadding z-20 !pt-4">
      <div className="max-w-container flex flex-col">
        <H1 weight="medium">Get a PDF offer in your email </H1>
        <div className="pb-4" />
        <BodyText>
          You’ll get link to re-access your estimate so you can review it any
          time.
        </BodyText>
        <div className="pb-4" />
        <Button onClick={openRequestDialog} className="w-full">
          REQUEST OFFER
        </Button>
        <div className="pb-6" />
        <div className="block h-96 w-full bg-red-500 ">
          Here we will put graph
        </div>
        <div className="pb-12" />

        <div className="flex w-full items-center justify-between gap-4 rounded-xl bg-white px-6 py-5">
          <H3 weight="medium">You will recoup your investment in 12 years</H3>
          <RecoupSvg className="text-brand-one-400 shrink-0" />
        </div>
        <div className="pb-12" />

        <div className="flex w-full items-center justify-between gap-4 rounded-xl bg-white px-6 py-5">
          <SvgIcon
            name="Leaf"
            className="text-brand-one-400 h-20 w-20 shrink-0"
          />
          <H3 weight="medium">
            You’d be saving 6 trees every year, reducing your Co2 footprint by
            45%
          </H3>
        </div>
      </div>
    </div>
  </>
);

const SystemDetailsSection = () => (
  <section className="bg-gray-1000 text-gray-450 containerPadding !pt-9">
    <div className="md:max-w-container flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <H2 weight="medium">Your Solar System</H2>
        <Button variant="main-gray" className="whitespace-nowrap">
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
      <div className="grid grid-cols-2 gap-6 border-b border-white/10 pb-4">
        <div className="flex items-center gap-4">
          <BodyText className="text-white">22x</BodyText>
          <div className="flex flex-col items-center gap-1">
            <SvgIcon name="SolarPanelAlt" className="text-brand-one-400" />
            <NoteText>410W</NoteText>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <BodyText className="text-white">1x</BodyText>
          <div className="flex flex-col items-center gap-1">
            <SvgIcon name="BatteryAlt" className="text-brand-one-400" />
            <NoteText>1,6 kWh</NoteText>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-center gap-4">
          <div className="flex w-8 items-center justify-end">
            <SvgIcon name="Lightning" />
          </div>
          <div className="flex flex-col ">
            <Label>Yearly output</Label>
            <div className="flex gap-2">
              <BodyText className="text-white">9500 kWh</BodyText>
              <button type="button">
                <SvgIcon name="Info" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex w-8 items-center justify-end">
            <SvgIcon name="MeterAlt" />
          </div>
          <div className="flex flex-col ">
            <Label>System power</Label>
            <div className="flex gap-2">
              <BodyText className="text-white">9,0 kWp</BodyText>
              <button type="button">
                <SvgIcon name="Info" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex w-8 items-center justify-end">
            <SvgIcon name="Coverage" />
          </div>
          <div className="flex flex-col ">
            <Label>Own energy usage coverage</Label>
            <BodyText className="text-white">48%</BodyText>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex w-8 items-center justify-end">
            <SvgIcon name="Leaf" />
          </div>
          <div className="flex flex-col ">
            <Label>CO2 saved per year</Label>
            <BodyText className="text-white">25 000 kg</BodyText>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SavingsSection = () => (
  <section className={clsxm('p-0 md:mb-9 lg:px-24')}>
    <div className="lg:max-w-container flex flex-col">
      <div className="flex gap-4 px-4 py-3 md:px-12 md:py-5 lg:px-0 ">
        <H2 weight="medium">How to pay for your system</H2>
        <SvgIcon name="Savings" />
      </div>
      <div className="grid w-full grid-cols-3">
        {/* First Column */}
        <div className="col-span-1 col-start-1 flex items-center bg-gray-200">
          <Label
            className="col-span-1 col-start-1 p-4 text-gray-600"
            weight="medium"
          >
            Financing option
          </Label>
        </div>
        <div className="col-span-1 col-start-1 row-span-1 flex h-14 items-center px-4">
          <Label className="text-gray-600">Net cost</Label>
        </div>
        <div className="col-span-1 col-start-1 row-span-1 flex h-14 items-center bg-gray-200 px-4">
          <Label className=" text-gray-600">Est. monthly payment</Label>
        </div>
        <div className="col-span-1 col-start-1 row-span-1 flex h-14 items-center px-4">
          <Label className="text-gray-600">Solar price per kWh</Label>
        </div>
        <div className="bg-brand-one-400 col-span-1 col-start-1 row-span-1 flex h-14 items-center px-4">
          <Label className=" text-white" weight="medium">
            Savings over 25 years
          </Label>
        </div>

        {/* Second Column */}
        <div className="bg-gray-1000 col-span-1 col-start-2 row-start-1 flex gap-2 p-4">
          <BodyText className="text-brand-one-400" weight="medium">
            Power Purchase
          </BodyText>
          <button type="button">
            <SvgIcon name="Info" className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="bg-gray-1000 col-span-1 col-start-2 row-span-1 row-start-2 flex  text-white">
          <div className="mx-4 flex h-14 w-full items-center gap-2 border-b  border-white/10 text-white">
            <BodyText weight="medium">0 €</BodyText>
            <button type="button">
              <SvgIcon name="Info" />
            </button>
          </div>
        </div>

        <div className="bg-gray-1000 col-span-1 col-start-2 row-span-1 row-start-3 flex  text-white">
          <div className="mx-4 flex h-14 w-full items-center gap-2 border-b  border-white/10 text-white">
            <BodyText weight="medium">150 €</BodyText>
            <button type="button">
              <SvgIcon name="Info" />
            </button>
          </div>
        </div>

        <div className="bg-gray-1000 col-span-1 col-start-2 row-span-1 row-start-4 flex  text-white">
          <div className="mx-4 flex h-14 w-full items-center gap-2 border-b  border-white/10 text-white">
            <BodyText weight="medium">0,19 €</BodyText>
            <button type="button">
              <SvgIcon name="Info" />
            </button>
          </div>
        </div>

        <div className="bg-gray-1000 col-span-1 col-start-2 row-span-1 row-start-5  flex h-14  items-center gap-2 px-4 text-white">
          <BodyText weight="medium">70 000 €</BodyText>
          <button type="button">
            <SvgIcon name="Info" />
          </button>
        </div>

        {/* Third Column */}
        <div className="col-start-3 row-start-1 flex gap-2 bg-gray-300 p-4">
          <BodyText className="text-brand-one-400" weight="medium">
            Direct Purchase
          </BodyText>
          <button type="button">
            <SvgIcon name="Info" className="h-5 w-5" />
          </button>
        </div>

        <div className="text-gray-1000 col-span-1 col-start-3 row-span-1 row-start-2 flex  bg-gray-300">
          <div className="mx-4 flex h-14 w-full items-center gap-2  border-b border-black/10">
            <BodyText className="text-gray-1000" weight="medium">
              12 000 €
            </BodyText>
            <button type="button">
              <SvgIcon name="Info" />
            </button>
          </div>
        </div>

        <div className="text-gray-1000 col-span-1 col-start-3 row-span-1 row-start-3 flex  bg-gray-300">
          <div className="mx-4 flex h-14 w-full items-center gap-2  border-b border-black/10">
            <BodyText className=" text-gray-1000" weight="medium">
              0 €
            </BodyText>
            <button type="button">
              <SvgIcon name="Info" />
            </button>
          </div>
        </div>

        <div className="text-gray-1000 col-span-1 col-start-3 row-span-1 row-start-4 flex  bg-gray-300">
          <div className="mx-4 flex h-14 w-full items-center gap-2  border-b border-black/10">
            <BodyText className=" text-gray-1000" weight="medium">
              0 €
            </BodyText>
            <button type="button">
              <SvgIcon name="Info" />
            </button>
          </div>
        </div>

        <div className="text-gray-1000 col-span-1 col-start-3 row-span-1 row-start-5 flex  bg-gray-300">
          <div className="mx-4 flex h-14 w-full items-center gap-2 ">
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
  </section>
);

const RequestButtons = ({
  openRequestDialog,
}: {
  openRequestDialog: () => void;
}) => (
  <>
    <div className="mb-8 hidden w-full px-4 md:flex md:px-12 lg:px-24">
      <Button className="md:max-w-container w-full" onClick={openRequestDialog}>
        REQUEST OFFER
      </Button>
    </div>

    <div className="shadow-3xl fixed bottom-0 flex w-full flex-col gap-4 bg-white p-4 pb-8 md:hidden md:px-12">
      <NoteText>
        Get a PDF offer in your email as well as a link to re-access your
        estimate by requesting an offer
      </NoteText>
      <Button onClick={openRequestDialog} className="w-full">
        REQUEST OFFER
      </Button>
    </div>
    <div className="block h-[136px] md:hidden" />
  </>
);
