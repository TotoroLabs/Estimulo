import React, { useState, useEffect } from "react";
import InnerHeader from "../../Components/InnerHeader";
import Footer from "../../Components/Footer";
import {
    FaGraduationCap,
    FaStar,
    FaPen,
    FaCamera,
    FaBookmark,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FiLogOut, FiBook } from "react-icons/fi";
import { useCookies } from "react-cookie";
import mongodb from "../../services/mongodb";
import { Link } from "react-router-dom";
import "./styles.scss";

export default function Profile({ history }) {
    const [JWTcookie, setJWTcookie, removeJWTcookie] = useCookies(["jwt"]);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [cameraisHiden, setCameraishiden] = useState(true);
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState(null);


    useEffect(() => {
        async function getUserData() {
          await mongodb
            .get('/sessions', {
              headers: { Authorization: `Bearer ${JWTcookie.jwt}` },
            })
            .then((response) => {
              setName(response.data.name);
              if (response.data.thumbnail) {
                setThumbnail(response.data.thumbnail);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if (JWTcookie.jwt) {
          getUserData();
        } else {
          history.push('/');
        }
      }, [JWTcookie.jwt, cookies.token, history]);

    function handleLogout() {
        removeCookie("token", { path: "/" });
        removeJWTcookie("jwt", { path: "/" });
        history.push("/");
    }

    async function handleSubmitAvatar(e) {
        e.preventDefault();
        const previewURL = URL.createObjectURL(e.target.files[0]);
        const data = new FormData();
        data.append('thumbnail', e.target.files[0]);
        await mongodb
          .put('/users', data, {
            headers: { Authorization: `Bearer ${JWTcookie.jwt}` },
          })
          .then(() => {
            setThumbnail(previewURL);
          })
          .catch((error) => {
            console.log(error);
          });
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
                                onChange={handleSubmitAvatar}
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
                        <Link to="/credenciais">
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
                        <Link to="/eu">
                            <div className="card-action">
                                <FaStar size={64} color="#ddd" />
                                <div className="card-action-title">
                                    <span>Favoritos</span>
                                </div>
                            </div>
                        </Link>
                        <Link to="/eu">
                            <div className="card-action">
                                <FaGraduationCap size={64} color="#ddd" />
                                <div className="card-action-title">
                                    <span>Aprenda</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <Link to="/projetos">
                        <div className="box-search">
                            <FiSearch size={64} color="#ddd" />
                            <div className="card-action-title">
                                <span>Busque por Pojetos</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
            <Footer />
        </>
    );
}
