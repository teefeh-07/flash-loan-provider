import React from 'react';

export const Tooltip = ({ text, children }) => <div className="tooltip" title={text}>{children}</div>;
