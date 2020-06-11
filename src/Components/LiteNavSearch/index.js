import React, { useState } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { useCookies } from "react-cookie";
import Logo from "../../assets/logo.svg";
export default function Litenav({ onSubmit, user, history }) {
    const [JWTcookie, setJWTcookie, removeJWTcookie] = useCookies(["jwt"]);

    const [boxactions, setBoxactions] = useState(false);
    const [inputfield, setInputfield] = useState();

    function handleLogout() {
        removeJWTcookie("jwt", { path: "/" });
        history.push("/");
    }
    async function handleSubmit(e) {
        e.preventDefault();
        console.log("o valor que eu estou jogando é:" + inputfield);
        await onSubmit({
            inputfield,
        });
        setInputfield("");
    }

    function handleActiveBoxActions() {
        console.log("ta desativado");

        setBoxactions(true);
    }
    function handleDisableBoxActions() {
        console.log("ta desativado");
        setBoxactions(false);
    }
    return (
        <div className="lite-nav-search">
            <div className="content">
                <div className="left-content">
                    <div className="box-logo">
                        <img src={Logo} alt="" />
                    </div>
                    <Link to="/">
                        <div className="box-logo">
                            <span><strong>Estímulo</strong> IFRN</span>
                        </div>
                    </Link>
                </div>
                <div className="center-content">
                    <div className="box-search">
                        <FaSearch
                            size={14}
                            color="#888"
                            style={{ margin: "auto 0 auto 10px" }}
                        />
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="search"
                                placeholder="Busque por categorias"
                                value={inputfield}
                                onChange={(e) => setInputfield(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
                <div
                    className="right-content"
                    onMouseLeave={handleDisableBoxActions}
                >
                    <button onClick={handleActiveBoxActions}>
                        <span>Olá, {user ? user.name.split(" ")[0] : "visitante"}</span>
                    </button>
                    <div className="icon-user">
                        {user ? (
                            <img src={user.thumbnail} />
                        ) : (
                            <FaUser size={25} color="#888" />
                        )}
                    </div>
                    <div
                        className={
                            boxactions ? "actions active" : "actions disable"
                        }
                        onMouseOver={handleActiveBoxActions}
                        onMouseOut={handleDisableBoxActions}
                    >
                        <Link to="/eu">
                            <div className="action-item">Minha Conta</div>
                        </Link>
                        <Link to="/eu/notificacoes">
                            <div className="action-item">Notificações</div>
                        </Link>
                        <div className="action-item" onClick={handleLogout}>
                            <a href="#">Sair</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
