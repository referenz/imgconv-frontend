import create from 'zustand';
import { GlobalState } from './GlobalState';

export type GlobalStateHandler = {
  globalState: GlobalState;
  setGlobalState(newState: GlobalState): void;
  init(): void;
};

export const useGlobalStateStore = create<GlobalStateHandler>(set => ({
  globalState: 'INIT',

  setGlobalState: newState => set(() => ({ globalState: newState })),

  init: () => set(() => ({ globalState: 'INIT' })),
}));
