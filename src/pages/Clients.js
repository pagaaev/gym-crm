import React, { useState } from 'react';
import './Clients.css';

const Clients = ({ clients, setClients }) => {
    const [form, setForm] = useState({ id: null, name: '', age: '', parent: '', phone: '' });
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddClient = () => {
        if (isEditing) {
            setClients(clients.map(client => (client.id === form.id ? form : client)));
            setIsEditing(false);
        } else {
            const newClient = { id: Date.now(), ...form };
            setClients([...clients, newClient]);
        }
        setShowModal(false);
        setForm({ id: null, name: '', age: '', parent: '', phone: '' });
    };

    const handleEditClient = (client) => {
        setForm(client);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDeleteClient = (id) => {
        setClients(clients.filter(client => client.id !== id));
    };

    return (
        <div className="clients">
            <h1>Дети академии</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Поиск клиента..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <button className="add-client-btn" onClick={() => setShowModal(true)}>
                Добавить ребёнка
            </button>

            <div className="client-grid">
                {clients
                    .filter(client => {
                        const searchText = search.toLowerCase();
                        return (
                            client.name.toLowerCase().includes(searchText) ||
                            client.parent.toLowerCase().includes(searchText) ||
                            client.phone.includes(searchText)
                        );
                    })
                    .map(client => (
                        <div key={client.id} className="client-card">
                            <p><strong>Имя:</strong> {client.name}</p>
                            <p><strong>Возраст:</strong> {client.age}</p>
                            <p><strong>Родитель:</strong> {client.parent}</p>
                            <p><strong>Телефон:</strong> {client.phone}</p>
                            <div className="card-actions">
                                <button
                                    className="edit-btn"
                                    onClick={() => handleEditClient(client)}
                                >
                                    Редактировать
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteClient(client.id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{isEditing ? 'Редактировать клиента' : 'Добавить клиента'}</h2>
                        <label>Имя:</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <label>Возраст:</label>
                        <input
                            type="number"
                            name="age"
                            value={form.age}
                            onChange={handleChange}
                        />
                        <label>Родитель:</label>
                        <input
                            type="text"
                            name="parent"
                            value={form.parent}
                            onChange={handleChange}
                        />
                        <label>Телефон:</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                        <div className="modal-actions">
                            <button className="save-btn" onClick={handleAddClient}>
                                {isEditing ? 'Сохранить' : 'Добавить'}
                            </button>
                            <button className="cancel-btn" onClick={() => setShowModal(false)}>
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clients;
