import React, { useContext } from 'react';
import { DarkModeContext } from '../Context/DarkModeContext';

const Footer = () => {

    const {darkMode} = useContext(DarkModeContext);

  return (

        <footer className={darkMode ? `dark` : `light`}>

            <p>2023 © All Rights Reserved. Desarrollado por: Ingrid Camacho</p>   

            <div className='icons'>
                <a href="https://www.linkedin.com/in/ingrid-julieth-camacho-uribe-52126a139/" target="_blank" rel="noreferrer"  aria-label="Facebook">
                <i class="fa-brands fa-linkedin"></i>
                </a>

                <a href="https://github.com/ingridCamachoU" target="_blank" rel="noreferrer"  aria-label="instagram">
                <i class="fa-brands fa-github"></i>
                </a>
            </div>     
        </footer>     
    );
}

export default Footer;
