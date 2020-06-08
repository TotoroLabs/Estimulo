import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import api from "../../services/api";
import mongodb from "../../services/mongodb";
import LiteNav from "../../Components/LiteNav";
import Emoji from "../../interfaces/emoji";
import Footer from "../../Components/Footer";
import "./sytles.scss";
export default function Welcome() {
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    function createToken() {
        var startTime = new Date().getTime();
        var finishTime = new Date(startTime + extractDuration() * 1000);
        setCookie("token", extractToken(), {
            path: "/",
            expires: finishTime,
            sameSite: "lax",
        });
    }

    var extractToken = function () {
        var match = document.location.hash.match(/access_token=(\w+)/);
        if (match != null) {
            return !!match && match[1];
        }
        return null;
    };
    var extractScope = function () {
        var match = document.location.hash.match(/scope=(.*)/);
        if (match != null) {
            return match[1].split("+").join(" ");
        }
        return null;
    };
    var extractDuration = function () {
        var match = document.location.hash.match(/expires_in=(\d+)/);

        if (match != null) {
            return Number(!!match && match[1]);
        }

        return 0;
    };

    useEffect(() => {
        async function getData() {
            await api
                .get(`/api/eu/`, {
                    headers: { Authorization: `Bearer ${cookies.token}` },
                })
                .then(async (response) => {
                    console.log(
                        "recebi do oauth3rd:" +
                            JSON.stringify(response.data.identificacao)
                    );
                    const mongodbresponse = await mongodb.get(
                        `/form/${response.data.identificacao}`
                    );
                    console.log(
                        "a resposta é: " + JSON.stringify(mongodbresponse.data)
                    );
                    if (Object.keys(mongodbresponse.data).length) {
                        history.push({
                            pathname: "/enviado",
                            state: { user: response.data },
                        });
                    } else {
                        history.push({
                            pathname: "/questionario",
                            state: { user: response.data },
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (cookies.token === undefined) {
            createToken();
        }
        getData();
    });
    useEffect(() => {
        console.log("o cookie é:" + cookies.token);
        console.log("o token é: " + extractToken());
        console.log("o escopo é: " + extractScope());
        console.log("a duração da expiração do cookie é: " + extractDuration());
    }, [cookies.token]);
    function handleLogin() {
        window.open(
            `${process.env.REACT_APP_SUAP_URL}/o/authorize/?response_type=token&grant_type=implict&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`,
            "_self"
        );
    }

    return (
        <>
            <section id="welcome">
                <LiteNav />
                <div className="content">
                    <div className="content-center">
                        <header>
                            <h1>E aí, como andam as coisas?</h1>
                        </header>
                        <div className="box-text">
                            <div className="text-section">
                                Já faz um tempo desde que as atividades
                                acadêmicas foram suspensas devido a quarenta, e
                                desde lá, muita coisa rolou...
                            </div>
                            <div className="text-section">
                                No intuito de ajudar a todos os estudantes
                                matriculados do IFRN, queremos saber a{" "}
                                <strong>
                                    situação das suas pesquisas científicas
                                </strong>{" "}
                                enquanto as aulas seguem paralizadas.
                            </div>
                            <div className="text-section">
                                Também queremos ter a opinião de quem ainda não
                                está vinculado a um trabalho científico, mas que
                                tem interesse em integrar a um projeto ou até
                                criar um. Nosso objetivo a partir do
                                levantamento desses dados é{" "}
                                <strong>poder ajudar a todos</strong>.
                            </div>
                            <div className="text-section">
                                Todos os dados levantados serão de suma
                                importância para saber em como ajudar a vocês.
                                Queremos que em breve a plataforma seja liberada
                                e que você decole. <Emoji symbol="🚀" />
                            </div>
                            <div className="text-section">
                                Nós da <span>Estimulo™</span> defendemos a{" "}
                                <strong>livre iniciativa</strong> e o potencial
                                que todos possuem. Todos podem contribuir aqui.{" "}
                                <Emoji symbol="💙" />
                            </div>
                            <div
                                className="text-section"
                                style={{ marginTop: 30 }}
                            >
                                Para começar, basta entrar na plataforma
                                utilizando seus dados do SUAP. Simples e fácil.
                            </div>
                            <div className="box-actions">
                                <button onClick={handleLogin}>COMEÇAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
