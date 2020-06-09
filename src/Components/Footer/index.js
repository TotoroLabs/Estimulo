import React from "react";
import Emoji from '../../interfaces/emoji'
import {Link} from 'react-router-dom';
import "./styles.scss";

export default function Footer() {
    return (
        <footer>
            <div className="wrapper">
                <div className="left-content">
                    <div className="content-item"><a href="https://github.com/KZTN">Feito com <Emoji symbol="💙" /></a></div>
                    <div className="content-item"><a href="mailto:estimuloifrn@gmail.com">estimuloifrn@gmail.com</a></div>
                </div>
                <div className="center-content">
                    <div className="content-item"><Link to="/politicas-de-privacidade">Políticas de privacidade</Link></div>
                    <div className="content-item">Termos de uso</div>
                </div>
                <div className="right-content">
                    <div className="content-item">
                        © 2020 Estimulo IFRN
                    </div>
                    <div className="content-item">
                       Direitos reservados.
                    </div>
                </div>
                <div className="outer-content"></div>
            </div>
        </footer>
    );
}
