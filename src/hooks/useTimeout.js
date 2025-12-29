import React from 'react';

export const useTimeout = (fn, ms) => React.useEffect(() => { const t = setTimeout(fn, ms); return () => clearTimeout(t); }, [fn, ms]);

// Exported
