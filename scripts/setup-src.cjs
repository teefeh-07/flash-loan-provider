const { automateGit, run } = require('./git-automate.cjs');
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'src');
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);

const files = [
    {
        path: 'src/index.html',
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flash Loan Provider</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
        branch: 'feat/setup-index-html',
        msg: 'feat: add index.html for frontend',
        title: 'Frontend: Index HTML',
        body: 'Added the basic HTML structure for the React frontend.'
    },
    {
        path: 'src/main.jsx',
        content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        branch: 'feat/setup-main-jsx',
        msg: 'feat: add main.jsx entry point',
        title: 'Frontend: Main JSX',
        body: 'Added the main entry point for the React application.'
    },
    {
        path: 'src/index.css',
        content: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #0f172a;
  color: #f8fafc;
}`,
        branch: 'feat/setup-index-css',
        msg: 'feat: add global styles',
        title: 'Frontend: Global Styles',
        body: 'Added global CSS styles with a modern dark theme.'
    },
    {
        path: 'src/App.jsx',
        content: `import React from 'react';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Flash Loan Provider</h1>
      </header>
      <main>
        <p>Welcome to the Flash Loan Provider on Stacks.</p>
      </main>
    </div>
  );
}

export default App;`,
        branch: 'feat/setup-app-jsx',
        msg: 'feat: add App.jsx component',
        title: 'Frontend: App Component',
        body: 'Added the base App component for the frontend.'
    }
];

for (const file of files) {
    console.log(`Creating ${file.path}...`);
    const fullPath = path.join(__dirname, '..', ...file.path.split('/'));
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, file.content);
    automateGit(file.branch, file.msg, file.title, file.body);
}
