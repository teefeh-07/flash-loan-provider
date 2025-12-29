import React from 'react';

export const Col = ({ children, span }) => <div className={`col-${span}`}>{children}</div>;

// TODO: Add PropTypes validation
