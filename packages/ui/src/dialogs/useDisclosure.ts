import { useCallback, useState } from 'react';

export const useDisclosure = (defaultState?: boolean) => {
  const [isOpen, setIsOpen] = useState(Boolean(defaultState));

  const toggle = useCallback(() => {
    setIsOpen(curState => !curState);
  }, []);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, onClose, onOpen, toggle };
};
