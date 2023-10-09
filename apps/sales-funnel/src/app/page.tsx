'use client';

import { AddressInput } from '@src/page-components/AddressInput';
import { BuildingType } from '@src/page-components/BuildingType';
import { ContactSales } from '@src/page-components/ContactSales';
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
    </>
  );
}
