import React from 'react';

export const useUnmount = (fn) => React.useEffect(() => () => { fn(); }, []);
