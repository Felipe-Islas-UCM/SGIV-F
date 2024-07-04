import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginPage.module.css';
import Logo from './comercial_pewen.png';

export function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password
            });
            localStorage.setItem('token', response.data.token);
            navigate('/admin');
        } catch (error) {
            setError('Credenciales inválidas');
        }
    };

    return (
        <div className={styles.LoginPage}>
            <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet' />
            <div className={styles.body}>
                <div className={styles.background}></div>
                <div className={styles.card}>
                    <img className={styles.logo} src={Logo} alt="Logo" />
                    <h2><b>Bienvenido!</b></h2>
                    {error && <p className={styles.error}>{error}</p>}
                    <form className={styles.form} onSubmit={handleLogin}>
                        <input 
                            type="text" 
                            placeholder="Usuario" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Ingresar</button>
                    </form>
                    <footer>
                        <b>Olvidaste tu contraseña?</b> Reestablece tú contraseña <a href="#">aquí</a>
                    </footer>
                </div>
            </div>
        </div>
    );
}