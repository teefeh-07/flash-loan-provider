import React from 'react';

export const useMount = (fn) => React.useEffect(() => { fn(); }, []);

// Exported
