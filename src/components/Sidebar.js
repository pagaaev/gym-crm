import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/clients">Клиенты</Link></li>
                <li><Link to="/schedule">Расписание</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
