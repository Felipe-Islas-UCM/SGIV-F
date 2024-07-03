import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import Logo from './comercial_pewen.png';

export function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        // Aquí puedes añadir la lógica de autenticación
        // Si la autenticación es exitosa, redirige al dashboard
        navigate('/admin');
    };

    return (
        <div className={styles.LoginPage}>
            <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet' />
            <div className={styles.body}>
                <div className={styles.background}></div>
                <div className={styles.card}>
                    <img className={styles.logo} src={Logo} alt="Logo" />
                    <h2><b>Bienvenido!</b></h2>
                    <form className={styles.form} onSubmit={handleLogin}>
                        <input type="email" placeholder="Usuario"  />
                        <input type="password" placeholder="Contraseña"  />
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