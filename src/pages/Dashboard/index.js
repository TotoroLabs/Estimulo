import React, { useState, useEffect } from "react";
import LiteNavSearch from "../../Components/LiteNavSearch";
import Card from "../../Components/Card";
import Footer from "../../Components/Footer";
import mongodb from "../../services/mongodb";
import { useCookies } from "react-cookie";
import { CircularProgress, makeStyles } from "@material-ui/core";
import "./styles.scss";
export default function Dashboard({ history }) {
    const [JWTcookie, setJWTcookie, removeJWTcookie] = useCookies(["jwt"]);
    const [user, setUser] = useState(null);
    const [isloading, setIsloading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState("");

    async function reloadData() {
        await mongodb
            .get("/projects", {
                headers: { Authorization: `Bearer ${JWTcookie.jwt}` },
            })
            .then((response) => {
                setProjects(response.data);
                setIsloading(false);
                setFilter("");
            })
            .catch((error) => {
                console.log(error);
            });
    }

useEffect(() => {
    async function getProjectData() {
        await mongodb
            .get("/projects", {
                headers: { Authorization: `Bearer ${JWTcookie.jwt}` },
            })
            .then((response) => {
                setProjects(response.data);
                setIsloading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    if (JWTcookie.jwt) {
        getProjectData();
    } else {
        history.push("/");
    }
}, [JWTcookie.jwt, history]);

    useEffect(() => {
        async function getUserData() {
            await mongodb
                .get("/sessions", {
                    headers: { Authorization: `Bearer ${JWTcookie.jwt}` },
                })
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (JWTcookie.jwt) {
            getUserData();
        } else {
            history.push("/");
        }
    }, [JWTcookie.jwt, history]);

    async function handleInputField(data) {
        await mongodb.get(
            `/projects/filtro/${data.inputfield}`
        ).then((response) => {
            setProjects(response.data);
            setFilter(data.inputfield);
            window.scrollTo(0, 0);
        }).catch((error) => {
            console.log(error);
        });

    }
    return (
        <>
            <LiteNavSearch
                onSubmit={handleInputField}
                user={user}
                history={history}
            />
            <section id="dashboard">
                {isloading ? <CircularProgress color="inherit" /> : null}

                <div className="content">
                    {isloading ? <CircularProgress color="inherit" /> : null}

                    <div className="box-info-results">
                        <div className="info-results">
                            <span>
                                {filter
                                    ? `Resultados da categoria: ${filter}`
                                    : null}
                            </span>
                        </div>
                        <div className="box-revert" onClick={reloadData}>
                            <span>
                                {filter ? `Remover filtros de pesquisa` : null}
                            </span>
                        </div>
                    </div>
                    {projects.length === 0 && !isloading ? (
                        <h1 style={{ marginTop: 20 }}>
                            Desculpe, não encontramos nada em sua região :(
                        </h1>
                    ) : null}
                    {projects.map((project) => (
                        <Card key={project._id} project={project}/>
                    ))}
                </div>
            </section>
            <Footer/>
        </>
    );
}
