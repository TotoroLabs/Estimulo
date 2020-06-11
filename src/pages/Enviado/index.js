import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MailSent from "../../assets/mockups/undraw_Mail_sent_qwwx.svg";
import LiteNav from "../../Components/LiteNav";
import mongodb from "../../services/mongodb";
import Footer from "../../Components/Footer";
import { useCookies } from "react-cookie";
import "./styles.scss";
export default function Enviado({ history }) {
    const [JWTcookie, setJWTcookie, removeJWTcookie] = useCookies(["jwt"]);
    const [userdata, setUserdata] = useState({});
    const location = useLocation();

    useEffect(() => {
        async function getUserData() {
            await mongodb
                .get("/sessions", {
                    headers: { Authorization: `Bearer ${JWTcookie.jwt}` },
                })
                .then((response) => {
                    setUserdata(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (JWTcookie.jwt) {
            getUserData();
        }
    }, [JWTcookie.jwt]);
    return (
        <>
            <section id="sent">
                <LiteNav history={history} username={userdata.name} thumbnail={userdata.thumbnail} />
                <div className="content">
                    <div className="content-header">
                        <header>
                            <h1>Já recebemos sua opinião</h1>
                        </header>
                        <div className="img-sent">
                            <img src={MailSent} />
                        </div>
                    </div>
                    <div className="center-content">
                        <div className="box-text">
                            A Estimulo agradeçe pela sua contribuição. Nossa
                            equipe irá colher todas as submissões e estaremos
                            criando novos recursos em breve.
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
