import React from "react";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import "./styles.scss";

export default function LiteNav({ user }) {
    return (
        <nav>
            <div className="wrapper">
                <Link to="/">
                    <div className="left-content">
                        <div className="logo">
                            <img src={Logo} alt="" />
                        </div>
                        <div className="brand">
                            <strong>estímulo</strong>IFRN
                        </div>
                    </div>
                </Link>
                <div className="right-content">
                    <div className="profile">
                        <span>Olá, {user ? user : "visitante"}</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
