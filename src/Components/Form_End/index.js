import React, { useState } from "react";
import Emoji from "../../interfaces/emoji";
import Approved from "../../assets/svg/approved.svg";
import mongodb from "../../services/mongodb";
import "./styles.scss";

export default function Form_End({identificacao, email}) {
    const [isloading, setIsloading] = useState(false);
    async function handleClick() {
        setIsloading(true);
        await mongodb.put(`/subscribe/${identificacao}`, null).then(() => {
            alert('Cadastrado com sucesso na newsletter');
            setIsloading(false);
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <section id="end">
            <div className="form-header">
                <div className="form-title">Sucesso</div>
                <div className="form-description">
                    Seu formulário foi recebido por nossa equipe. Agora chegou a
                    nossa vez de trabalhar <Emoji symbol="💪" />
                </div>
            </div>
            <div className="end-text">
                Agradeçemos pela sua opinião, ela será importante para traçarmos
                o que fazer. <br /> Em breve traremos os primeiros recursos para
                a comunidade.
            </div>
            <div className="end-icon">
                <img src={Approved} alt="" srcset=""/>
            </div>
            <div className="text-tip">
    Se preferir, iremos lhe manter informados via email acadêmico, <strong>{email}</strong> <br/> basta clicar no botão abaixo.
            </div>
            <div className="form-actions">
                <button onClick={handleClick}>OK! Mantenha-me informado</button>
            </div>
        </section>
    );
}
