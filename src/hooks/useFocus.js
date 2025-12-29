import React from 'react';

export const useFocus = () => { const [isFocused, setIsFocused] = React.useState(false); const bind = { onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false) }; return [isFocused, bind]; };
