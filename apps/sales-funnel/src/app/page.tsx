import { ContactSales } from '@src/page-components/ContactSales';
import { create } from 'zustand';

// Linked list like data structure, we can easily insert views in between
type View = { back: string | null; next: string | null; data?: any };
type Views = Record<string, View>;

const views: Views = {
  welcome: {
    back: null,
    next: 'addressInput',
  },
  // This is added based on the selected option in welcome screen
  // contactSales: {
  //   back: welcome,
  //   next: 'addressInput',
  // }
  addressInput: {
    back: 'welcome',
    next: 'roofSummary',
  },
  roofSummary: {
    back: 'addressInput',
    next: 'energyConsumptionPersons',
  },
  energyConsumptionPersons: {
    back: 'roofSummary',
    next: 'energyConsumptionHeating',
  },
  energyConsumptionSpace: {
    back: 'roofSummary',
    next: 'energyConsumptionWater',
  },
  // Based on the selected option in welcome screen, only for commercial building type
  // energyConsumptionCommercialYearly: {
  //   back: 'energyConsumptionSpace',
  //   next: 'energyConsumptionWater',
  // },
  energyConsumptionWater: {
    back: 'energyConsumptionPersons',
    next: 'energyConsumptionBigConsumers',
  },
  energyConsumptionBigConsumers: {
    back: 'energyConsumptionWater',
    next: 'energyConsumptionElectricity',
  },
  energyConsumptionYearly: {
    back: 'energyConsumptionSpace',
    next: 'energyConsumptionWater',
  },
  estimatePP: {
    back: 'energyConsumptionElectricity',
    next: 'roofSummary',
  },
  // ? I assume EstimateModify doesn't have to be a state
  // ? The enitre RequestOffer flow is in a modal, so I am not sure if we want it to be state, but if we do, we can add it here
};

type FlowState = {
  next: () => void;
  back: () => void;
  currentView: View;
  views: Views;
};

export const useFlowStore = create<FlowState>(set => ({
  views,
  currentView: views[0],
  next: () =>
    set(state => {
      if (!state.currentView.next) return state;
      return { currentView: views[state.currentView.next] };
    }),
  back: () =>
    set(state => {
      if (!state.currentView.back) return state;
      return { currentView: views[state.currentView.back] };
    }),
}));

export default function Home() {
  const { currentView } = useFlowStore();
  return (
    <>
      {currentView.data === 'welcome' && <ContactSales />}
      {currentView.data === 'contactSales' && <ContactSales />}
    </>
  );
}
