import React from 'react';

export const Alert = ({ children, type }) => <div className={`alert alert-${type}`}>{children}</div>;
