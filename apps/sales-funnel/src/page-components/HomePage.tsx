'use client';

import { AddressInput } from '@src/page-components/AddressInput';
import { BuildingType } from '@src/page-components/BuildingType';
import { ContactSales } from '@src/page-components/ContactSales';
import { EnergyConsumptionBigConsumers } from '@src/page-components/EnergyConsumptionBigConsumers';
import { EnergyConsumptionCommercial } from '@src/page-components/EnergyConsumptionCommercial';
import { EnergyConsumptionPersons } from '@src/page-components/EnergyConsumptionPersons';
import { EnergyConsumptionSpace } from '@src/page-components/EnergyConsumptionSpace';
import { EnergyConsumptionWater } from '@src/page-components/EnergyConsumptionWater';
import { EnergyConsumptionYearly } from '@src/page-components/EnergyConsumptionYearly';
import { EstimatePP } from '@src/page-components/EstimatePP';
import { RoofSummary } from '@src/page-components/RoofSummary';
import { useFlowStore, ViewNames } from '@src/store/flow';
import { useEffect, useState } from 'react';

export function HomePage() {
  const { currentView } = useFlowStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  // Rehydrate the store on page load
  useEffect(() => {
    useFlowStore.persist.rehydrate();
    setHasHydrated(true);
  }, []);

  // TODO add a loading state?
  if (!hasHydrated) return null;

  const inEstimateView: ViewNames[] = [
    'estimatePP',
    'requestOffer',
    'roofAge',
    'roofMaterial',
    'ownership',
    'timeframe',
    'serviceInterest',
    'notes',
    'thankYou',
  ];

  return (
    <>
      {currentView === 'buildingType' && <BuildingType />}
      {currentView === 'contactSales' && <ContactSales />}
      {currentView === 'addressInput' && <AddressInput />}
      {currentView === 'roofSummary' && <RoofSummary />}
      {currentView === 'energyConsumptionCommercial' && (
        <EnergyConsumptionCommercial />
      )}
      {currentView === 'energyConsumptionPersons' && (
        <EnergyConsumptionPersons />
      )}
      {currentView === 'energyConsumptionSpace' && <EnergyConsumptionSpace />}
      {currentView === 'energyConsumptionWater' && <EnergyConsumptionWater />}
      {currentView === 'energyConsumptionBigConsumers' && (
        <EnergyConsumptionBigConsumers />
      )}
      {currentView === 'energyConsumptionYearly' && <EnergyConsumptionYearly />}
      {inEstimateView.includes(currentView) && <EstimatePP />}
    </>
  );
}
