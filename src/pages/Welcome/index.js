import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import api from "../../services/api";
import mongodb from "../../services/mongodb";
import LiteNav from "../../Components/LiteNav";
import Emoji from "../../interfaces/emoji";
import Footer from "../../Components/Footer";
import "./sytles.scss";
export default function Welcome({ history }) {
    const [JWTcookie, setJWTcookie, removeJWTcookie] = useCookies(["jwt"]);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [userdata, setUserdata] = useState({});
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

    function createToken() {
        var startTime = new Date().getTime();
        var finishTime = new Date(startTime + extractDuration() * 1000);
        setCookie("token", extractToken(), {
            path: "/",
            expires: finishTime,
            sameSite: "lax",
        });
    }
    async function createUser(response) {
        await mongodb.post('/users', response.data);
    }
    async function createSession(response) {
        await mongodb.post("/sessions", {
            email: response.data.email,
            identificacao: response.data.identificacao,
        }).then((response) => {
                var startTime = new Date().getTime();
                var finishTime = new Date(
                    startTime + 36000 * 1000
                );
                setJWTcookie("jwt", response.data.token, {
                    path: "/",
                    expires: finishTime,
                    sameSite: "lax",
                });
        }).catch((error) => {
            console.log(error);
        });
    }
    var extractToken = function () {
        var match = document.location.hash.match(/access_token=(\w+)/);
        if (match != null) {
            return !!match && match[1];
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
/*                     console.log(
                        "recebi do oauth3rd:" +
                            JSON.stringify(response.data.identificacao)
                    ); */
                    const mongodbresponse = await mongodb.get(
                        `/form/${response.data.identificacao}`
                    );
/*                     console.log(
                        "a resposta é: " + JSON.stringify(mongodbresponse.data)
                    ); */
                    const userexists = await mongodb.get(
                        `/users/${response.data.identificacao}`
                    );
                    if (Object.keys(userexists.data).length) {
                        createSession(response);
                    } else {
                        createUser(response);
                        createSession(response);
                    }
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
    function handleLogin() {
        window.open(
            `${process.env.REACT_APP_SUAP_URL}/o/authorize/?response_type=token&grant_type=implict&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`,
            "_self"
        );
    }

    return (
        <>
       <LiteNav history={history} username={userdata.namegit}/>
            <section id="welcome">
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
                                Nós da <span>Estimulo</span> defendemos a{" "}
                                <strong>livre iniciativa</strong> e o potencial
                                que todos possuem. Todos podem contribuir aqui.
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
