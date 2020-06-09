import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MailSent from "../../assets/mockups/undraw_Mail_sent_qwwx.svg";
import LiteNav from "../../Components/LiteNav";
import Footer from "../../Components/Footer";
import { useCookies } from "react-cookie";
import "./styles.scss";
export default function Enviado({ history }) {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [userdata, setUserdata] = useState({});
    const location = useLocation();
    function getDataLocation() {
        if (location.state) {
            removeCookie("token", { path: "/" });
            setUserdata(location.state.user);
        } else {
            history.push("/");
        }
    }
    useEffect(() => {
        getDataLocation();
    });
    return (
        <>
            <section id="sent">
                <LiteNav user={userdata.nome} />
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
