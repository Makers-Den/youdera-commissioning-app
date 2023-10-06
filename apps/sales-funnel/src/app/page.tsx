'use client';

import { BuildingType } from '@src/page-components/BuildingType';
import { ContactSales } from '@src/page-components/ContactSales';
import { useFlowStore } from '@src/store/flow';

export default function Home() {
  const { currentView } = useFlowStore();
  return (
    <>
      {/* {currentView === 'buildingType' && <Development />} */}
      {currentView === 'buildingType' && <BuildingType />}
      {currentView === 'contactSales' && <ContactSales />}
    </>
  );
}
