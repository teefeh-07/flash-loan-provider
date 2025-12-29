import React from 'react';

export const Modal = ({ children, isOpen }) => isOpen ? <div className="modal">{children}</div> : null;
