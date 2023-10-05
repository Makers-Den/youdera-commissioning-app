import { create } from 'zustand';

// Linked list like data structure, we can easily insert views in between
type View = { previous: string | null; next: string | null; data?: any };
type Views = Record<string, View>;

const views: Views = {
  welcome: {
    previous: null,
    next: 'addressInput',
  },
  // This is added based on the selected option in welcome screen
  // contactSales: {
  //   previous: welcome,
  //   next: 'addressInput',
  // }
  addressInput: {
    previous: 'welcome',
    next: 'roofSummary',
  },
  roofSummary: {
    previous: 'addressInput',
    next: 'energyConsumptionPersons',
  },
  energyConsumptionPersons: {
    previous: 'roofSummary',
    next: 'energyConsumptionHeating',
  },
  energyConsumptionSpace: {
    previous: 'roofSummary',
    next: 'energyConsumptionWater',
  },
  // Based on the selected option in welcome screen, only for commercial building type
  // energyConsumptionCommercialYearly: {
  //   previous: 'energyConsumptionSpace',
  //   next: 'energyConsumptionWater',
  // },
  energyConsumptionWater: {
    previous: 'energyConsumptionPersons',
    next: 'energyConsumptionBigConsumers',
  },
  energyConsumptionBigConsumers: {
    previous: 'energyConsumptionWater',
    next: 'energyConsumptionElectricity',
  },
  energyConsumptionYearly: {
    previous: 'energyConsumptionSpace',
    next: 'energyConsumptionWater',
  },
  estimatePP: {
    previous: 'energyConsumptionElectricity',
    next: 'roofSummary',
  },
  // ? I assume EstimateModify doesn't have to be a state
  // ? The enitre RequestOffer flow is in a modal, so I am not sure if we want it to be state, but if we do, we can add it here
};

type FlowState = {
  next: () => void;
  back: () => void;
  currentView: string;
  views: Views;
};

export const useFlowStore = create<FlowState>(set => ({
  views,
  currentView: 'welcome',
  next: () =>
    set(state => {
      const nextView = views[state.currentView].next;
      if (!nextView) return state;
      return { currentView: nextView };
    }),
  back: () =>
    set(state => {
      const previousView = views[state.currentView].previous;
      if (!previousView) return state;
      return { currentView: previousView };
    }),
}));
