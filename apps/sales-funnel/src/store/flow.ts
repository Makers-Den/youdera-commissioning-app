import { create } from 'zustand';

export const viewNames = [
  'buildingType',
  'contactSales',
  'addressInput',
  'roofSummary',
  'energyConsumptionPersons',
  'energyConsumptionSpace',
  'energyConsumptionCommercialYearly',
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

const views: Views = {
  buildingType: {
    previous: null,
    next: 'addressInput',
  },
  // ? This is added based on the selected option in buildingType screen
  contactSales: {
    previous: 'buildingType',
    next: 'addressInput',
  },
  addressInput: {
    previous: 'buildingType',
    next: 'roofSummary',
  },
  roofSummary: {
    previous: 'addressInput',
    next: 'energyConsumptionPersons',
  },
  energyConsumptionPersons: {
    previous: 'roofSummary',
    next: 'energyConsumptionSpace',
  },
  energyConsumptionSpace: {
    previous: 'energyConsumptionPersons',
    next: 'energyConsumptionWater',
  },
  // ? Based on the selected option in welcome screen, only for commercial building type
  energyConsumptionCommercialYearly: {
    previous: 'energyConsumptionSpace',
    next: 'energyConsumptionWater',
  },
  energyConsumptionWater: {
    previous: 'energyConsumptionPersons',
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

const flowDataName = [
  'buildingType', //BuildingType
  'streetAddress', //AddressInput
  'peopleInHousehold', //EnergyConsumptionPersons
  'primarySpaceHeating', //EnergyConsumptionSpace
  'primaryWaterHeating', //EnergyConsumptionWater
] as const;

type FlowDataNames = typeof flowDataName[number];
type FlowData = Partial<Record<FlowDataNames, string>>;

type FlowState = {
  next: () => void;
  back: () => void;
  currentView: ViewNames;
  data: FlowData;
  setData: (data: FlowData) => void;
  views: Views;
};

export const useFlowStore = create<FlowState>(set => ({
  views,
  currentView: 'buildingType',
  data: {},
  setData: (newData: FlowData) =>
    set(state => ({ data: { ...state.data, ...newData } })),
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
