import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Renderiza el componente raíz "App" en el div con id "root" en index.html
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
