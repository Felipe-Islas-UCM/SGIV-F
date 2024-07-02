import React from 'react';
import { Paper, Typography, Grid , Link } from '@mui/material';
import Mapa from "../../images/Mapa.png";
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Contacto() {
    return (
        <div style={{ backgroundColor: '#FFC107', margin: 'auto', textAlign: 'center' }}>

            <Typography variant="h4" align="center" gutterBottom>Contacto</Typography>
            <div style={{ backgroundColor: '#FFC107', minHeight: '100vh', padding: '20px' }}>
                <PhoneIcon /> <Typography variant="h5" gutterBottom>Teléfono</Typography>
                <Typography variant="body1" gutterBottom>+56972473435</Typography>

                <Typography variant="h5" gutterBottom>Correo Electrónico</Typography><MailIcon />
                <Typography variant="body1" gutterBottom>comercialpewen@gmail.com</Typography>

                <Typography variant="h5" gutterBottom>Dirección</Typography><LocationOnIcon />
                <Typography variant="body1" gutterBottom>30 oriente 6 norte 1712 | Talca 🇨🇱</Typography>
                <Typography variant="body1" gutterBottom>Lunes a Viernes de 10:00-19:00</Typography>


                <div style={{ borderRadius: '10px', overflow: 'hidden', margin: '20px 0' }}>
                    <iframe
                        title="map"
                        width="100%"
                        height="300"
                        loading="lazy"
                        allowFullScreen
                        src='https://www.google.com/maps/place/Comercial+Pewen+SpA/@-35.4254184,-71.6282342,1810m/data=!3m1!1e3!4m6!3m5!1s0x9665c73791a2aced:0x1851a39b807e57a9!8m2!3d-35.4257573!4d-71.6249694!16s%2Fg%2F11t_pq1lqj?entry=ttu'
                        style={{ border: 0, width: '100%' }}
                    ></iframe>
                </div>

                <a href="https://www.google.com/maps/place/Comercial+Pewen+SpA/@-35.4254184,-71.6282342,1810m/data=!3m1!1e3!4m6!3m5!1s0x9665c73791a2aced:0x1851a39b807e57a9!8m2!3d-35.4257573!4d-71.6249694!16s%2Fg%2F11t_pq1lqj?entry=ttu" target="_blank">
                    <img src={Mapa} alt="Mapa Comercial Pewen" />
                </a>


                <Typography variant="h5" gutterBottom>Redes Sociales</Typography>
                <Typography variant="body1" gutterBottom>Síguenos en @comercialpewen</Typography>
                <Link href="https://www.instagram.com/comercialpewen/" target="_blank" rel="noopener">
                    <InstagramIcon />
                </Link>
                <Link href="https://www.facebook.com/comercial.pewen/" target="_blank" rel="noopener">
                    <FacebookIcon />
                </Link>
                <Link href="https://www.instagram.com/comercialpewen/" target="_blank" rel="noopener">
                    <TwitterIcon />
                </Link>
                <Link href="https://www.instagram.com/comercialpewen/" target="_blank" rel="noopener">
                    <LinkedInIcon />
                </Link>

            </div>
        </div>
    );
}

export default Contacto;






