import React from 'react';

export const useInterval = (fn, ms) => React.useEffect(() => { const t = setInterval(fn, ms); return () => clearInterval(t); }, [fn, ms]);
