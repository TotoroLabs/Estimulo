import React, { useState, useEffect } from "react";
import ActionsHeader from "../../Components/ActionsHeader";
import { FaEllipsisV } from "react-icons/fa";
import { useCookies } from "react-cookie";
import mongodb from "../../services/mongodb";
import NotificationModal from "../../Components/NotificationModal";

import "./styles.scss";

export default function Notifications({ history }) {
    const [JWTcookie, setJWTcookie, removeJWTcookie] = useCookies(["jwt"]);
    const [modalisopen, setModalisopen] = useState(false);
    const [notifications, setNotificaitons] = useState([]);
    const [notificationindex, setNotificationindex] = useState(null);
    const [user, setUser] = useState(null);
    const [ischecked, setIschecked] = useState(false);
    const [listcheckboxes, setListcheckboxes] = useState([]);
    const [checkall, setCheckall] = useState(false);
    var arrlistcheckboxes = [];

    function handleCheckAll() {
        arrlistcheckboxes = [];
        if (checkall) {
            setCheckall(false);
            setIschecked(false);
            setListcheckboxes([]);
        } else {
            setCheckall(true);
            setIschecked(true);
            notifications.map((notification, index) => {
                arrlistcheckboxes.push(index);
            });
            setListcheckboxes(arrlistcheckboxes);
        }
    }
    async function markAsRead(_id) {
        await mongodb
        .put(`/notifications/${_id}`, null, {
            headers: { Authorization: `Bearer ${JWTcookie.jwt}` },
        })
    }
    function evoqueModal(index) {
        const aux = notifications
        aux[index].state = "read";
        setNotificaitons(aux);
        setModalisopen(true);
        setNotificationindex(index);
        markAsRead(aux[index]._id);
    }
    function handleCloseModal() {
        setModalisopen(false);
    }
    async function handleDeleteNotifications() {
        listcheckboxes.map(async (notitem) => {
            console.log('estou enviando: ' + notifications[notitem]._id);
            await mongodb
                .delete(`/notifications/${notifications[notitem]._id}`, {
                    headers: { Authorization: `Bearer ${JWTcookie.jwt}` },
                })
                .then(() => {
                    setListcheckboxes(
                        listcheckboxes.splice(
                            listcheckboxes.indexOf(notitem),
                            1
                        )
                    );
                    setNotificaitons(notifications.splice(notitem + 1, 1));
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
    function handleCheckBoxItem(index) {
        arrlistcheckboxes = listcheckboxes;
        if (!arrlistcheckboxes.find((elementBox) => elementBox === index)) {
            arrlistcheckboxes.push(index);
            setIschecked(true);
        } else {
            arrlistcheckboxes.splice(arrlistcheckboxes.indexOf(index), 1);
            if (arrlistcheckboxes.length === 0) {
                setIschecked(false);
            }
        }
        setListcheckboxes(arrlistcheckboxes);
    }
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
    }, [JWTcookie.jwt, notifications, history]);
    useEffect(() => {
        async function getUserData() {
            await mongodb
                .get("/sessions", {
                    headers: { Authorization: `Bearer ${JWTcookie.jwt}` },
                })
                .then((response) => {
                    setNotificaitons(response.data.notifications);
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
    return (
        <section id="notifications">
            <ActionsHeader />
            {modalisopen ? (
                <NotificationModal
                    notification={notifications[notificationindex]}
                    onClick={handleCloseModal}
                />
            ) : null}
            <div className="content">
                <div className="list-wrapper">
                    <div className="section-header">
                        <h1>Notificações</h1>
                    </div>
                    <ul>
                        <div className="ul-header">
                            <div className="header-actions">
                                <input
                                    type="checkbox"
                                    checked={checkall}
                                    onClick={handleCheckAll}
                                    disabled={!notifications[0]}
                                    id="checkall"
                                />
                                <button
                                    disabled={!ischecked}
                                    onClick={() => handleDeleteNotifications()}
                                >
                                    Excluir
                                </button>
                            </div>
                            <div className="header-index">
                                <span>
                                    Notificações 1 - {notifications.length} de{" "}
                                    {notifications.length}
                                </span>
                            </div>
                        </div>
                        {!notifications[0] ? (
                            <li style={{ width: "100vh" }}>
                                Sua lista de notificações está vazia
                            </li>
                        ) : (
                            notifications.map((notification, index) => (
                                <li key={notification._id}>
                                    <input
                                        type="checkbox"
                                        id="selectall"
                                        value={index}
                                        checked={
                                            checkall ||
                                            listcheckboxes.find(
                                                (elementBox) =>
                                                    elementBox === index
                                            )
                                        }
                                        onChange={(e) =>
                                            handleCheckBoxItem(e.target.value)
                                        }
                                    />
                                    <div className="li-content">
                                        <div className="li-photo">
                                            <img
                                                src={notification.thumbnail}
                                                alt=""
                                                onClick={() =>
                                                    evoqueModal(index)
                                                }
                                            />
                                        </div>
                                        <div className="li-details">
                                            <div
                                                className="li-title"
                                                onClick={() =>
                                                    evoqueModal(index)
                                                }
                                            >
                                                {notification.title.length > 40 ? (
                                                    <span>
                                                        {notification.title.substring(
                                                            0,
                                                            40
                                                        )}
                                                        ...
                                                    </span>
                                                ) : (
                                                    <span>{notification.title}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="li-actions">
                                        <button
                                            disabled={
                                                notification.state === "unread"
                                                    ? false
                                                    : true
                                            }
                                            onClick={() => evoqueModal(index)}
                                        >
                                            {notification.state === "unread" ? (
                                                <span>Ver notificacao</span>
                                            ) : (
                                                <span>Notificação lida</span>
                                            )}
                                        </button>
                                        <FaEllipsisV size={20} color="#555" />
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
}
