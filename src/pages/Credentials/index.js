import React, { useState, useEffect, useMemo } from "react";
import InnerHeader from "../../Components/InnerHeader";
import { FaCamera, FaArrowLeft } from "react-icons/fa";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Input from "react-phone-number-input/input";
import { useCookies } from "react-cookie";
import mongodb from "../../services/mongodb";
import { Link } from "react-router-dom";
import "./styles.scss";

export default function Credentials({ history }) {
    const [JWTcookie, setJWTcookie, removeJWTcookie] = useCookies(["jwt"]);
    const [alertmsg, setAlertmsg] = useState("");
    const [alertisopen, setAlertisopen] = useState(false);
    const [alertseverity, setAlertseverity] = useState("");
    const [cameraisHiden, setCameraishiden] = useState(true);
    const [thumbnail, setThumbnail] = useState(null);
    const [namefield, setNamefield] = useState("");
    const [phonefield, setPhonefield] = useState("");
    const [zipfield, setZipfield] = useState("");
    const [cityfield, setCityfield] = useState("");
    const [numberfield, setNumberfield] = useState("");
    const [streetfield, setStreetfield] = useState("");
    const [uffield, setUffield] = useState("");
    const [emailfield, setEmailfield] = useState("");
    const [newemailfield, setNewemailfield] = useState("");
    const [identificacaofield, setidentificacaofieldd] = useState("");

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertmsg("");
        setAlertisopen(false);
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    useEffect(() => {
        async function getUserData() {
            await mongodb
                .get("/sessions", {
                    headers: { Authorization: `Bearer ${JWTcookie.jwt}` },
                })
                .then((response) => {
                    setNamefield(response.data.name);
                    setPhonefield(response.data.phone);
                    setZipfield(response.data.ZIP);
                    setEmailfield(response.data.email);
                    setCityfield(response.data.city);
                    setNumberfield(response.data.number);
                    setStreetfield(response.data.street);
                    setidentificacaofieldd(response.data.id);
                    setUffield(response.data.uf);
                    if (response.data.thumbnail) {
                        setThumbnail(response.data.thumbnail);
                    }
                });
        }
        if (JWTcookie.jwt) {
            getUserData();
        } else {
            history.push("/");
        }
    }, [JWTcookie.jwt, history]);

    async function handlesubmit(e) {
        e.preventDefault();
        const data = new FormData();
        if (namefield !== "") {
            data.append("name", namefield);
        }
        if (phonefield !== "") {
            data.append("phone", phonefield);
        }
        if (zipfield !== "") {
            data.append("ZIP", zipfield);
        }
        if (streetfield !== "") {
            data.append("street", streetfield);
        }
        if (numberfield !== "") {
            data.append("number", numberfield);
        }
        if (uffield !== "") {
            data.append("uf", uffield);
        }
        if (cityfield !== "") {
            data.append("city", cityfield);
        }
        if (newemailfield !== "") {
            data.append("email", newemailfield);
        }
        await mongodb
            .put("/users", data, {
                headers: { Authorization: `Bearer ${JWTcookie.jwt}` },
            })
            .then(() => {
                setAlertisopen(true);
                setAlertmsg("Dados atualizados com sucesso!");
                setAlertseverity("success");
            })
            .catch((error) => {
                console.log(error);
                setAlertisopen(true);
                setAlertmsg("Não foi possível alterar, revise seus dados");
                setAlertseverity("error");
            });
    }

    async function handleSubmitAvatar(e) {
        e.preventDefault();
        const previewURL = URL.createObjectURL(e.target.files[0]);
        const data = new FormData();
        data.append("thumbnail", e.target.files[0]);
        await mongodb
            .put("/users", data, {
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
            <Snackbar
                open={alertisopen}
                autoHideDuration={4000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={alertseverity}>
                    {alertmsg}
                </Alert>
            </Snackbar>
            <InnerHeader />
            <section id="credentials">
                <div className="content">
                    <div className="me">
                        <div
                            className="avatar"
                            onMouseOver={() => setCameraishiden(false)}
                            onMouseOut={() => setCameraishiden(true)}
                        >
                            <form
                                id="form-avatar"
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
                            <span>Suas informações pessoais</span>
                        </div>
                        <div className="box-actions">
                            <Link to="/eu">
                                <button title="Voltar ao menu principal">
                                    <FaArrowLeft size={18} color="#555" />
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="card-credentials">
                        <form onSubmit={handlesubmit} id="form-credentials">
                            <div className="box-mainly-credentials">
                                <div className="form-section-header">
                                    <span>Dados da conta</span>
                                </div>
                                <div className="form-section">
                                    <div className="form-element">
                                        <label htmlFor="name">Nome</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={namefield}
                                            onChange={(e) =>
                                                setNamefield(e.target.value)
                                            }
                                            placeholder={namefield}
                                        />
                                    </div>
                                    <div className="form-element">
                                        <label htmlFor="phone">Telefone</label>
                                        <Input
                                            country="BR"
                                            name="phone"
                                            id="phone"
                                            value={phonefield}
                                            onChange={setPhonefield}
                                            placeholder={phonefield}
                                        />
                                    </div>
                                </div>
                                <div className="form-section">
                                    <div className="form-element">
                                        <label htmlFor="matricula">
                                            Matrícula
                                        </label>
                                        <input
                                            type="text"
                                            disabled={true}
                                            name="matricula"
                                            id="matricula"
                                            placeholder={identificacaofield}
                                        />
                                    </div>
                                    <div className="form-element">
                                        <label htmlFor="email">E-mail</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            disabled={true}
                                            placeholder={emailfield}
                                        />
                                        <label htmlFor="newemail">
                                            Novo E-mail
                                        </label>
                                        <input
                                            type="email"
                                            name="newemail"
                                            id="newemail"
                                            value={newemailfield}
                                            onChange={(e) =>
                                                setNewemailfield(e.target.value)
                                            }
                                            placeholder="Seu novo email"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit">Salvar</button>
                            <div className="box-address-credentials">
                                <div className="form-section-header">
                                    <span>Dados de endereço</span>
                                </div>
                                <div className="form-section">
                                    <div className="form-element">
                                        <label htmlFor="city">Cidade</label>
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            value={cityfield}
                                            onChange={(e) =>
                                                setCityfield(e.target.value)
                                            }
                                            placeholder={cityfield}
                                        />
                                    </div>
                                    <div className="form-element">
                                        <label htmlFor="ZIP">CEP</label>
                                        <input
                                            type="text"
                                            name="ZIP"
                                            id="ZIP"
                                            value={zipfield}
                                            onChange={(e) =>
                                                setZipfield(e.target.value)
                                            }
                                            placeholder={zipfield}
                                        />
                                    </div>
                                </div>
                                <div className="form-section">
                                    <div className="form-element">
                                        <label htmlFor="street">Endereço</label>
                                        <input
                                            type="text"
                                            name="street"
                                            id="street"
                                            value={streetfield}
                                            onChange={(e) =>
                                                setStreetfield(e.target.value)
                                            }
                                            placeholder={streetfield}
                                        />
                                    </div>
                                    <div className="wrap-elements">
                                        <div className="form-element">
                                            <label htmlFor="number">Nº</label>
                                            <input
                                                type="text"
                                                name="number"
                                                id="number"
                                                value={numberfield}
                                                onChange={(e) =>
                                                    setNumberfield(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={numberfield}
                                            />
                                        </div>
                                        <div
                                            className="form-element"
                                            style={{ textAlign: "center" }}
                                        >
                                            <label htmlFor="uf">UF</label>
                                            <select
                                                name="estados-brasil"
                                                value={uffield}
                                                onChange={(e) =>
                                                    setUffield(e.target.value)
                                                }
                                            >
                                                <option value="AC">AC</option>
                                                <option value="AL">AL</option>
                                                <option value="AP">AP</option>
                                                <option value="AM">AM</option>
                                                <option value="BA">BH</option>
                                                <option value="CE">CE</option>
                                                <option value="DF">DF</option>
                                                <option value="ES">ES</option>
                                                <option value="GO">GO</option>
                                                <option value="MA">MA</option>
                                                <option value="MT">MT</option>
                                                <option value="MS">MS</option>
                                                <option value="MG">MG</option>
                                                <option value="PA">OA</option>
                                                <option value="PB">PB</option>
                                                <option value="PR">PR</option>
                                                <option value="PE">PE</option>
                                                <option value="PI">PI</option>
                                                <option value="RJ">RJ</option>
                                                <option value="RN">RN</option>
                                                <option value="RS">RS</option>
                                                <option value="RO">RO</option>
                                                <option value="RR">RR</option>
                                                <option value="SC">SC</option>
                                                <option value="SP">SP</option>
                                                <option value="SE">SE</option>
                                                <option value="TO">TO</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit">Salvar</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
