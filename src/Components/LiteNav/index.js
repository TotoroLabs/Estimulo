import React, { useState } from "react";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./styles.scss";

export default function LiteNav({ history, username, thumbnail }) {
    const [boxactions, setBoxactions] = useState(true);
    const [inputfield, setInputfield] = useState();
    const [JWTcookie, setJWTcookie, removeJWTcookie] = useCookies(["jwt"]);
    function handleLogin() {
        window.open(
            `${process.env.REACT_APP_SUAP_URL}/o/authorize/?response_type=token&grant_type=implict&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`,
            "_self"
        );
    }
    function handleActiveBoxActions() {
        console.log("ta desativado");

        setBoxactions(true);
    }
    function handleDisableBoxActions() {
        console.log("ta desativado");
        setBoxactions(false);
    }
    function handleLogout() {
        removeJWTcookie("jwt", { path: "/" });
        history.push("/");
    }
    return (
        <nav id="litenav">
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
                        <button onClick={handleActiveBoxActions}>
                            Olá, {username ? username.split(" ")[0] : "visitante"}
                        </button>
                    </div>
                    <div
                        className={
                            boxactions ? "actions active" : "actions disable"
                        }
                        onMouseOver={handleActiveBoxActions}
                        onMouseOut={handleDisableBoxActions}
                    >
                        {username ? (
                            <>
                                <Link to="/eu">
                                    <div className="action-item">
                                        Minha Conta
                                    </div>
                                </Link>
                                <div
                                    className="action-item"
                                    onClick={handleLogout}
                                >
                                    <a href="#">Sair</a>
                                </div>
                            </>
                        ) : (
                            <a onClick={handleLogin}>
                                <div className="action-item">Entrar</div>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
