'use client';

import { AddressInput } from '@src/page-components/AddressInput';
import { BuildingType } from '@src/page-components/BuildingType';
import { ContactSales } from '@src/page-components/ContactSales';
import { EnergyConsumptionBigConsumers } from '@src/page-components/EnergyConsumptionBigConsumers';
import { EnergyConsumptionPersons } from '@src/page-components/EnergyConsumptionPersons';
import { EnergyConsumptionSpace } from '@src/page-components/EnergyConsumptionSpace';
import { EnergyConsumptionWater } from '@src/page-components/EnergyConsumptionWater';
import { EnergyConsumptionYearly } from '@src/page-components/EnergyConsumptionYearly';
import { RoofSummary } from '@src/page-components/RoofSummary';
import { useFlowStore } from '@src/store/flow';

export default function Home() {
  const { currentView } = useFlowStore();
  return (
    <>
      {/* {currentView === 'buildingType' && <Development />} */}
      {currentView === 'contactSales' && <ContactSales />}
      {currentView === 'buildingType' && <BuildingType />}
      {currentView === 'addressInput' && <AddressInput />}
      {currentView === 'roofSummary' && <RoofSummary />}
      {currentView === 'energyConsumptionPersons' && (
        <EnergyConsumptionPersons />
      )}
      {currentView === 'energyConsumptionSpace' && <EnergyConsumptionSpace />}
      {currentView === 'energyConsumptionWater' && <EnergyConsumptionWater />}
      {currentView === 'energyConsumptionBigConsumers' && (
        <EnergyConsumptionBigConsumers />
      )}
      {currentView === 'energyConsumptionYearly' && <EnergyConsumptionYearly />}
    </>
  );
}
