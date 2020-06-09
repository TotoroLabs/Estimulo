import React, { useState, useEffect } from "react";
import InnerHeader from "../../Components/InnerHeader";
import Footer from "../../Components/Footer";

import { FaGraduationCap, FaStar, FaPen, FaCamera, FaBookmark } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FiLogOut, FiBook } from "react-icons/fi";
import { useCookies } from "react-cookie";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./styles.scss";

export default function Profile({ history }) {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [cameraisHiden, setCameraishiden] = useState(true);
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState(null);

    function handleLogout() {
        removeCookie("token", { path: "/" });
        history.push("/");
    }

    return (
        <>
            <InnerHeader />
            <section id="profile">
                <div className="content">
                    <div className="me">
                        <form action=""></form>
                        <div
                            className="avatar"
                            onMouseOver={() => setCameraishiden(false)}
                            onMouseOut={() => setCameraishiden(true)}
                        >
                            <form
                                // onChange={handleSubmitAvatar}
                                enctype="multipart/form-data"
                                method="put"
                            >
                                <label id="thumbnail">
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                    />
                                    {cameraisHiden ? null : (
                                        <FaCamera
                                            size={52}
                                            color="#ddd"
                                            style={{
                                                position: "absolute",
                                                marginLeft: 95,
                                                marginTop: 95,
                                                cursor: "pointer",
                                            }}
                                        />
                                    )}
                                    <img
                                        src={
                                            thumbnail
                                                ? thumbnail
                                                : "https://cdn.discordapp.com/attachments/697512026251067472/711345678885847140/user-solid.png"
                                        }
                                        alt="avatar"
                                    />
                                </label>
                            </form>
                        </div>
                        <div className="box-greetings">
                            <span>
                                Olá, <strong>{name} </strong>
                            </span>
                            <div className="logout">
                                <button title="Sair" onClick={handleLogout}>
                                    <FiLogOut size={14} color="#000" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="box-actions">
                        <Link to="/BUZZ/profile/credentials">
                            <div className="card-action">
                                <FaPen size={64} color="#ddd" />
                                <div className="card-action-title">
                                    <span>Dados pessoais</span>
                                </div>
                            </div>
                        </Link>

                        <div className="card-action">
                            <FaBookmark size={72} color="#ddd" />

                            <div className="card-action-title">
                                <span>Seus Projetos</span>
                            </div>
                        </div>
                        <Link to="/BUZZ/profile/favorites">
                            <div className="card-action">
                                <FaStar size={64} color="#ddd" />
                                <div className="card-action-title">
                                    <span>Favoritos</span>
                                </div>
                            </div>
                        </Link>
                        <div className="card-action">
                            <FaGraduationCap size={64} color="#ddd" />
                            <div className="card-action-title">
                                <span>Aprenda</span>
                            </div>
                        </div>
                    </div>
                    <Link to="/BUZZ/vouchers">
                        <div className="box-search">
                            <FiSearch size={64} color="#ddd" />
                            <div className="card-action-title">
                                <span>Busque por Pojetos</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
            <Footer/>
        </>
    );
}
