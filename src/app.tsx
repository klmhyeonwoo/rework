import React from 'react'
import ReactDOM from 'react-dom/client'
import {Routers} from "@/router";
import './style/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Routers/>
    </React.StrictMode>,
)
