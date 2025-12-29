const { automateGit, run } = require('./git-automate.cjs');
const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'components', 'ui');
if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

const components = [
    { name: 'Button', code: 'export const Button = ({ children, onClick }) => <button onClick={onClick}>{children}</button>;' },
    { name: 'Input', code: 'export const Input = ({ value, onChange }) => <input value={value} onChange={onChange} />;' },
    { name: 'Label', code: 'export const Label = ({ children }) => <label>{children}</label>;' },
    { name: 'Card', code: 'export const Card = ({ children }) => <div className="card">{children}</div>;' },
    { name: 'CardHeader', code: 'export const CardHeader = ({ children }) => <div className="card-header">{children}</div>;' },
    { name: 'CardBody', code: 'export const CardBody = ({ children }) => <div className="card-body">{children}</div>;' },
    { name: 'CardFooter', code: 'export const CardFooter = ({ children }) => <div className="card-footer">{children}</div>;' },
    { name: 'Container', code: 'export const Container = ({ children }) => <div className="container">{children}</div>;' },
    { name: 'Row', code: 'export const Row = ({ children }) => <div className="row">{children}</div>;' },
    { name: 'Col', code: 'export const Col = ({ children, span }) => <div className={`col-${span}`}>{children}</div>;' },
    { name: 'Badge', code: 'export const Badge = ({ children, variant }) => <span className={`badge badge-${variant}`}>{children}</span>;' },
    { name: 'Spinner', code: 'export const Spinner = () => <div className="spinner">Loading...</div>;' },
    { name: 'Alert', code: 'export const Alert = ({ children, type }) => <div className={`alert alert-${type}`}>{children}</div>;' },
    { name: 'Avatar', code: 'export const Avatar = ({ src, alt }) => <img src={src} alt={alt} className="avatar" />;' },
    { name: 'Navbar', code: 'export const Navbar = ({ children }) => <nav className="navbar">{children}</nav>;' },
    { name: 'Footer', code: 'export const Footer = ({ children }) => <footer className="footer">{children}</footer>;' },
    { name: 'Sidebar', code: 'export const Sidebar = ({ children }) => <aside className="sidebar">{children}</aside>;' },
    { name: 'Modal', code: 'export const Modal = ({ children, isOpen }) => isOpen ? <div className="modal">{children}</div> : null;' },
    { name: 'Tooltip', code: 'export const Tooltip = ({ text, children }) => <div className="tooltip" title={text}>{children}</div>;' },
    { name: 'Divider', code: 'export const Divider = () => <hr className="divider" />;' }
];

for (const comp of components) {
    const compPath = path.join(componentsDir, `${comp.name}.jsx`);
    console.log(`Creating ${comp.name}...`);

    // 1. Create File with basic structure
    fs.writeFileSync(compPath, `import React from 'react';\n\n`);
    automateGit(
        `feat/ui-${comp.name.toLowerCase()}-init`,
        `feat: initialize ${comp.name} component`,
        `UI: Init ${comp.name}`,
        `Started work on the ${comp.name} UI component.`
    );

    // 2. Add implementation
    fs.appendFileSync(compPath, `${comp.code}\n`);
    automateGit(
        `feat/ui-${comp.name.toLowerCase()}-impl`,
        `feat: implement ${comp.name} component logic`,
        `UI: Implement ${comp.name}`,
        `Added implementation for ${comp.name}.`
    );

    // 3. Add Prop Types (Mock)
    fs.appendFileSync(compPath, `\n// TODO: Add PropTypes validation\n`);
    automateGit(
        `chore/ui-${comp.name.toLowerCase()}-props`,
        `chore: add todo for ${comp.name} props`,
        `UI: ${comp.name} Props`,
        `Added placeholder for PropTypes validation in ${comp.name}.`
    );
}
