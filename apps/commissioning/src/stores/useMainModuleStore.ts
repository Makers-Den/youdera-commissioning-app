import { Module } from '@src/api/youdera/apiTypes';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface MainModuleState {
  mainModule: Module | null;
  setMainModule: (module: Module) => void;
}

export const useMainModuleStore = create<MainModuleState>()(
  persist(
    set => ({
      mainModule: null,
      setMainModule: (module: Module) => {
        set(state => ({ ...state, mainModule: module }));
      },
    }),
    {
      name: 'main-module',
      getStorage: () => localStorage,
    },
  ),
);
