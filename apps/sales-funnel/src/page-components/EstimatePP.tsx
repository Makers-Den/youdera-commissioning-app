import { useFlowStore } from '@src/store/flow';
import React from 'react';

export const EstimatePP = () => {
  const { back } = useFlowStore();
  return (
    <button onClick={back} type="button">
      back
    </button>
  );
};
