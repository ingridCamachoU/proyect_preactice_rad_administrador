import {RouterProvider} from "react-router-dom";
import { router } from './router';
import { DarkModeProvider } from "./Context/DarkModeContext";

import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './Styles/Styles.scss';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <DarkModeProvider>
            <RouterProvider router = {router}/>
        </DarkModeProvider>  
    </React.StrictMode>
      
);

