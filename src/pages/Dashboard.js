import React from 'react';
import './Dashboard.css';

const Dashboard = ({ clients }) => {
    console.log('clients в Dashboard:', clients);

    const totalClients = clients.length;

    const averageAge = totalClients
        ? (clients.reduce((sum, client) => sum + parseInt(client.age, 10), 0) / totalClients).toFixed(1)
        : 0;

    const ageGroups = {
        'от 3-х до 5 лет': clients.filter(client => client.age >= 3 && client.age < 5).length,
        'от 5 до 7 лет': clients.filter(client => client.age >= 5 && client.age <= 7).length,
        'от 7 лет': clients.filter(client => client.age > 7).length,
    };

    return (
        <div className="dashboard">
            <h1>Статистика</h1>
            <div className="dashboard-cards">
                <div className="card">
                    <h2>Всего клиентов</h2>
                    <p className="card-number">{totalClients}</p>
                </div>
                <div className="card">
                    <h2>Средний возраст</h2>
                    <p className="card-number">{averageAge} лет</p>
                </div>
                <div className="card">
                    <h2>Возрастные группы</h2>
                    <ul className="age-groups">
                        {Object.entries(ageGroups).map(([group, count]) => (
                            <li key={group}>
                                <span>{group}</span>: <strong>{count}</strong> чел.
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
