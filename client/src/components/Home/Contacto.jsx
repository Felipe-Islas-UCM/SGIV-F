import React from 'react';
import { Paper, Typography, Grid, Link } from '@mui/material';
import Mapa from "../../images/Mapa.png";
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Contacto() {
    const iconStyle = {
        color: '#271805',
        '&:hover': {
            color: '#F37E17',
        },
    };
    return (
        <div style={{ backgroundColor: '#C99C33', margin: 'auto', textAlign: 'center' }}>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            </link>
            <h2 variant="h4" align="center" gutterBottom>Contacto</h2>
            <div style={{ backgroundColor: '#C99C33', minHeight: '100vh', padding: '20px' }}>
                <PhoneIcon /> <h2 gutterBottom>Teléfono</h2>
                <h2 gutterBottom>+56972473435</h2>

                <h2 gutterBottom>Correo Electrónico</h2><MailIcon />
                <h2>comercialpewen@gmail.com</h2>

                <h2>Dirección</h2><LocationOnIcon />
                <h2>30 oriente 6 norte 1712 | Talca 🇨🇱</h2>
                <h2>Lunes a Viernes de 10:00-19:00</h2>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '32px 0',
                        textAlign: 'center',
                        backgroundColor: '#271805',
                        width: '100%'
                    }}
                >
                    <h2 style={{ color: 'white' }}><b>¡Encuéntranos aquí!</b></h2>

                    <a href="https://www.google.com/maps/place/Comercial+Pewen+SpA/@-35.4254184,-71.6282342,1810m/data=!3m1!1e3!4m6!3m5!1s0x9665c73791a2aced:0x1851a39b807e57a9!8m2!3d-35.4257573!4d-71.6249694!16s%2Fg%2F11t_pq1lqj?entry=ttu"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={Mapa}
                            alt="Mapa Comercial Pewen"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                border: '3px solid black'
                            }}
                        />
                    </a>
                </div>


                <h2>Redes Sociales</h2>
                <h2>Síguenos en @comercialpewen</h2>

                <Link href="https://www.instagram.com/comercialpewen/" target="_blank" rel="noopener">
                    <InstagramIcon sx={iconStyle} />
                </Link>
                <Link href="https://www.facebook.com/comercial.pewen/" target="_blank" rel="noopener">
                    <FacebookIcon sx={iconStyle} />
                </Link>
                <Link href="https://twitter.com/comercialpewen" target="_blank" rel="noopener">
                    <TwitterIcon sx={iconStyle} />
                </Link>
                <Link href="https://www.linkedin.com/company/comercialpewen" target="_blank" rel="noopener">
                    <LinkedInIcon sx={iconStyle} />
                </Link>

            </div>
        </div >
    );
}

export default Contacto;




