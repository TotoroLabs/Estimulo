import React from "react";
import {Link} from 'react-router-dom';
import "./styles.scss";

export default function GradientHeader(logged) {

    return (
        <section id="gradientheader">
            <nav>
                <div className="left-content">
                    <div className="logo"><strong>Estímulo</strong> IFRN</div>
                </div>
                <div className="right-content">
                <div className="nav-item">
                       <Link to="/"><button id="btn2">Home</button></Link>
                    </div>
                    <div className="nav-item">
                        <button>{logged ? "Entrar" : "Sair"}</button>
                    </div>
                </div>
            </nav>
            <div className="center-content">
                <header>Políticas de Privacidade</header>
                <span>Políticas de privacidade da plataforma Estímulo</span>
            </div>
        </section>
    );
}
