import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Dashboard from './Dashboard';

// Función para renderizar el Dashboard en el div con id "registros-root"
window.renderDashboard = () => {
    ReactDOM.render(
        <Dashboard />,
        document.getElementById('registros-root')
    );
};

// Renderiza la aplicación principal
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
