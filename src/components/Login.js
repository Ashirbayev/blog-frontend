// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const userCredentials = { email, password };

        axios.post('http://localhost:3000/api/users/login', userCredentials)
            .then(response => {

                localStorage.setItem('token', response.data.token); // Сохраняем токен в localStorage
                onLogin(); // Вызываем функцию onLogin для переключения на список постов
            })
            .catch(error => {
                console.error('There was an error logging in!', error);
            });
    };

    return (
        <div>
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;
