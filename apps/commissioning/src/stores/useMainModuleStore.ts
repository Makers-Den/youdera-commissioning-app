import { Module } from '@src/integrations/youdera/modules/types';
import create from 'zustand';

interface MainModuleState {
  mainModule: Module | null;
  setMainModule: (module: Module) => void;
}

export const useMainModuleStore = create<MainModuleState>()(set => ({
  mainModule: null,
  setMainModule: (module: Module) => {
    set(state => ({ ...state, mainModule: module }));
  },
}));
