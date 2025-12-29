import React from 'react';

export const useCounter = (initial = 0) => { const [count, setCount] = React.useState(initial); const inc = () => setCount(c => c + 1); const dec = () => setCount(c => c - 1); return { count, inc, dec }; };
