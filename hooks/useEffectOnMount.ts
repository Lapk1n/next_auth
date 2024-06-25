import { useEffect, useRef } from 'react';

export const useEffectOnMount = (effect: () => any, dependency?: any) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      effect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependency]);
};
