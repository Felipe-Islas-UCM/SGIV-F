import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Logo from './comercial_pewen.png';


export function LoginPage() {

    //const history = useNavigate();

    //const handleLogin = () => {
        // Aquí puedes añadir la lógica de autenticación
        // Si la autenticación es exitosa, redirige al dashboard
        //navigate.push('/admin');
    //};
    return (
        <div className='Login'>
            <html lang="en">
                <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet' />
                <head>
                    <title>Logins</title>
                </head>
                <body>
                    <div class="background"></div>
                    <div class="card">
                        <img class="logo" src={Logo} />
                        <h2><b>Bienvenido!</b></h2>
                        <form class="form">
                            <input type="email" placeholder="Usuario" />
                            <input type="password" placeholder="Contraseña" />
                            <button>Ingresar</button>
                        </form>
                        <footer>
                            <b>Olvidaste tu contraseña?</b> Reestablece contraseña
                            <a href="#">aquí</a>
                        </footer>
                    </div>
                </body>
            </html>
        </div>
    )
}
