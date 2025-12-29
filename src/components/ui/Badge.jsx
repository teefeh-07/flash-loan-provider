import React from 'react';

export const Badge = ({ children, variant }) => <span className={`badge badge-${variant}`}>{children}</span>;
