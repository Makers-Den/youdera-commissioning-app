'use client';

import { ContactSales } from '@src/page-components/ContactSales';
import { useFlowStore } from '@src/store/flow';

export default function Home() {
  const { currentView } = useFlowStore();
  return (
    <>
      {currentView === 'welcome' && <ContactSales />}
      {currentView === 'contactSales' && <ContactSales />}
    </>
  );
}
