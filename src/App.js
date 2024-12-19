import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Schedule from './pages/Schedule';
import './App.css';

const App = () => {
    // Состояние для клиентов
    const [clients, setClients] = useState(() => {
        const savedClients = localStorage.getItem('clients');
        return savedClients ? JSON.parse(savedClients) : [];
    });

    // Состояние для расписания
    const [schedule, setSchedule] = useState(() => {
        const savedSchedule = localStorage.getItem('schedule');
        return savedSchedule ? JSON.parse(savedSchedule) : [];
    });

    // Сохранение расписания и клиентов в localStorage при изменении
    React.useEffect(() => {
        localStorage.setItem('clients', JSON.stringify(clients));
    }, [clients]);

    React.useEffect(() => {
        localStorage.setItem('schedule', JSON.stringify(schedule));
    }, [schedule]);

    return (
        <Router>
            <div className="app">
                <Sidebar />
                <div className="main">
                    <Header />
                    <Routes>
                        {/* Передаём общее состояние clients и schedule в дочерние компоненты */}
                        <Route path="/" element={<Dashboard clients={clients} />} />
                        <Route
                            path="/clients"
                            element={<Clients clients={clients} setClients={setClients} />}
                        />
                        <Route
                            path="/schedule"
                            element={<Schedule schedule={schedule} setSchedule={setSchedule} />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;

