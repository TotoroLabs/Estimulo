import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import LiteNav from "../../Components/LiteNav";
import { useLocation } from "react-router-dom";
import Form_1 from "../../Components/Form_1";
import Form_2 from "../../Components/Form_2";
import Form_S_1 from "../../Components/Form_S_1";
import Form_S_O_1 from "../../Components/Form_S_O_1";
import Form_N_1 from "../../Components/Form_N_1";
import Form_N_J_1 from "../../Components/Form_N_J_1";
import mongodb from "../../services/mongodb";
import Form_End from "../../Components/Form_End";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";

import "./styles.scss";

export default function Form({ history }) {
    const [isloading, setIsloading] = useState(false);
    const [progress, setProgress] = useState(20);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [btndisabled, setBtndisabled] = useState(true);
    const [userdata, setUserdata] = useState({});

    const [currentSelected, setCurrentSelected] = useState({});
    const useStyles = makeStyles({
        root: {
            width: "100%",
        },
    });

    const location = useLocation();
    function handleProgress(e) {
        setProgress(e);
    }
    async function handleForm(data) {
        setCurrentSelected(data);
        setBtndisabled(false);
    }
    function handleCLick() {
        handleProgress(progress + 20);
        setBtndisabled(true);
        var newobj = userdata;
        Object.assign(newobj, currentSelected);
        setUserdata(newobj);
    }
    useEffect(() => {
        setUserdata(location.state.user);
    }, [location.state.user]);
    useEffect(() => {
        if (!cookies.token) {
            history.push("/");
        }
    });
    useEffect(() => {
        async function sendForm() {
            await mongodb
                .post("/forms", userdata)
                .then((response) => {
                })
                .catch((error) => {
                    console.log("erro!! " + error);
                });
            setIsloading(false);
        }
        if (progress === 100) {
            setIsloading(true);
            sendForm();
        }
    }, [progress, removeCookie, userdata]);
    return (
        <section id="form">
            <LiteNav user={userdata.nome} />
            <div className="content">
                <div className={useStyles.root}>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        color="secondary"
                    />
                </div>

                <div className="form-body">
                    {progress === 20 ? (
                        <Form_1 onSubmit={handleForm} />
                    ) : progress === 40 ? (
                        <Form_2 onSubmit={handleForm} />
                    ) : userdata.joined_project &&
                      userdata.status_project === undefined ? (
                        <Form_S_1 onSubmit={handleForm} />
                    ) : !userdata.joined_project &&
                      userdata.wannajoin === undefined &&
                      userdata.wannacreate === undefined ? (
                        <Form_N_1 onSubmit={handleForm} />
                    ) : !userdata.joined_project &&
                      (userdata.wannajoin || userdata.wannacreate) &&
                      progress < 100 ? (
                        <Form_N_J_1 onSubmit={handleForm} />
                    ) : userdata.joined_project &&
                      (userdata.status_project === "ongoing" ||
                          userdata.status_project === "paused") &&
                      progress < 100 ? (
                        <Form_S_O_1 onSubmit={handleForm} />
                    ) : progress === 100 && isloading === false ? (
                        <Form_End identificacao={userdata.identificacao} />
                    ) : null}
                </div>
            </div>
            <div className="form-actions">
                <div className="box-loading" style={{marginRight: "auto"}}>{isloading? <CircularProgress color="secondary"/>: <div></div>}</div>
               {progress < 100? <button onClick={handleCLick} disabled={btndisabled}>
                    {progress < 80? "Próximo": "Enviar"}
                </button> : null}
            </div>
        </section>
    );
}
