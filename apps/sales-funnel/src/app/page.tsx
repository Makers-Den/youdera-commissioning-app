'use client';

import { ContactSales } from '@src/page-components/ContactSales';
import { Development } from '@src/page-components/Development';
import { useFlowStore } from '@src/store/flow';

export default function Home() {
  const { currentView } = useFlowStore();
  return (
    <>
      {currentView === 'welcome' && <Development />}
      {currentView === 'contactSales' && <ContactSales />}
    </>
  );
}
