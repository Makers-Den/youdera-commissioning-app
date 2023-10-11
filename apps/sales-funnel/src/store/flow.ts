import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const viewNames = [
  'buildingType',
  'contactSales',
  'addressInput',
  'roofSummary',
  'energyConsumptionPersons',
  'energyConsumptionSpace',
  'energyConsumptionCommercial',
  'energyConsumptionWater',
  'energyConsumptionBigConsumers',
  'energyConsumptionYearly',
  'estimatePP',
  // ? 'estimateModify',
  // ? 'requestOffer'...
] as const;

export type ViewNames = typeof viewNames[number];

// Linked list like data structure, we can easily insert views in between
type View = { previous: ViewNames | null; next: ViewNames | null; data?: any };
type Views = Record<ViewNames, View>;

export const views: Views = {
  buildingType: {
    previous: null,
    next: 'addressInput',
  },
  // ? This is added based on the selected option in buildingType screen
  contactSales: {
    previous: 'buildingType',
    next: null,
  },
  addressInput: {
    previous: 'buildingType',
    next: 'roofSummary',
  },
  roofSummary: {
    previous: 'addressInput',
    next: 'energyConsumptionPersons',
  },
  // ? Based on the selected option in welcome screen, only for commercial building type
  energyConsumptionCommercial: {
    previous: 'roofSummary',
    next: 'estimatePP',
  },
  energyConsumptionPersons: {
    previous: 'roofSummary',
    next: 'energyConsumptionSpace',
  },
  energyConsumptionSpace: {
    previous: 'energyConsumptionPersons',
    next: 'energyConsumptionWater',
  },
  energyConsumptionWater: {
    previous: 'energyConsumptionSpace',
    next: 'energyConsumptionBigConsumers',
  },
  energyConsumptionBigConsumers: {
    previous: 'energyConsumptionWater',
    next: 'energyConsumptionYearly',
  },
  energyConsumptionYearly: {
    previous: 'energyConsumptionBigConsumers',
    next: 'estimatePP',
  },
  estimatePP: {
    previous: 'energyConsumptionYearly',
    next: 'roofSummary',
  },
  // ? I assume EstimateModify doesn't have to be a state
  // ? The entire RequestOffer flow is in a modal, so I am not sure if we want it to be state, but if we do, we can add it here
};

export type FlowData = {
  buildingType: 'home' | 'industrial' | 'agricultural' | 'commercial'; //BuildingType
  streetAddress: string; //AddressInput
  peopleInHousehold: '1' | '2' | '3' | '4' | '5' | '5+'; //EnergyConsumptionPersons
  primarySpaceHeating: 'electrical' | 'heatpump' | 'other'; //EnergyConsumptionSpace
  primaryWaterHeating: 'electrical' | 'heatpump' | 'other'; //EnergyConsumptionWater
  bigEnergyConsumers: (
    | 'sauna'
    | 'pool'
    | 'air conditioning'
    | 'electric vehicle'
  )[]; //EnergyConsumptionBigConsumers
  yearlyConsumption: string; //EnergyConsumptionYearly or EnergyConsumptionCommercial
  openingDays: (
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday'
  )[]; //EnergyConsumptionCommercial
  openingTimes: [from: number, to: number];
};

export type PartialFlowData = Partial<FlowData>;

export type FlowState = {
  currentView: ViewNames;
  data: PartialFlowData;
  views: Views;
  setData: (data: PartialFlowData) => void;
  setViews: (views: Partial<Views>) => void;
  next: () => void;
  back: () => void;
};

export const useFlowStore = create<FlowState>()(
  persist(
    set => ({
      views,
      currentView: 'buildingType',
      data: {},
      setData: newData =>
        set(state => ({ data: { ...state.data, ...newData } })),
      setViews: newViews =>
        set(state => ({ views: { ...state.views, ...newViews } })),
      next: () =>
        set(state => {
          const nextView = state.views[state.currentView].next;
          if (!nextView) return state;
          return { currentView: nextView };
        }),
      back: () =>
        set(state => {
          const previousView = state.views[state.currentView].previous;
          if (!previousView) return state;
          return { currentView: previousView };
        }),
    }),
    {
      name: 'flowStates', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      partialize: state => ({
        currentView: state.currentView,
        data: state.data,
        views: state.views,
      }),
      skipHydration: true,
    },
  ),
);
