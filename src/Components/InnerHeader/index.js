import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

export default function Innerheader() {
    return (
        <header className="innerheader">
            <div className="content">
                <div className="box-logo">
                    <Link to="/">
                        <h3>Estimulo IFRN</h3>
                    </Link>
                </div>
                <div className="header-element">
                    <span>Contato</span>
                </div>
            </div>
        </header>
    );
}
