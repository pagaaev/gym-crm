import React, { useState } from 'react';
import './Schedule.css';

const Schedule = ({ schedule, setSchedule }) => {
    const [form, setForm] = useState({ id: null, date: '', time: '', group: '', coach: '' });
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddSession = () => {
        if (isEditing) {
            setSchedule(schedule.map(session => (session.id === form.id ? form : session)));
            setIsEditing(false);
        } else {
            const newSession = { id: Date.now(), ...form };
            setSchedule([...schedule, newSession]);
        }
        setShowModal(false);
        setForm({ id: null, date: '', time: '', group: '', coach: '' });
    };

    const handleEditSession = (session) => {
        setForm(session);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDeleteSession = (id) => {
        setSchedule(schedule.filter(session => session.id !== id));
    };

    return (
        <div className="schedule">
            <h1 className="schedule-title">Расписание тренировок</h1>
            <button className="add-session-btn" onClick={() => setShowModal(true)}>
                + Добавить тренировку
            </button>
            <div className="schedule-grid">
                {schedule.map(session => (
                    <div key={session.id} className="session-card">
                        <div className="session-info">
                            <p><strong>Дата:</strong> {session.date}</p>
                            <p><strong>Время:</strong> {session.time}</p>
                            <p><strong>Группа:</strong> {session.group}</p>
                            <p><strong>Тренер:</strong> {session.coach}</p>
                        </div>
                        <div className="card-actions">
                            <button className="edit-btn" onClick={() => handleEditSession(session)}>✏️</button>
                            <button className="delete-btn" onClick={() => handleDeleteSession(session.id)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{isEditing ? 'Редактировать тренировку' : 'Добавить тренировку'}</h2>
                        <label>Дата:</label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                        />
                        <label>Время:</label>
                        <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                        />
                        <label>Группа:</label>
                        <input
                            type="text"
                            name="group"
                            value={form.group}
                            onChange={handleChange}
                        />
                        <label>Тренер:</label>
                        <input
                            type="text"
                            name="coach"
                            value={form.coach}
                            onChange={handleChange}
                        />
                        <div className="modal-actions">
                            <button onClick={handleAddSession}>{isEditing ? 'Сохранить' : 'Добавить'}</button>
                            <button onClick={() => setShowModal(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Schedule;
