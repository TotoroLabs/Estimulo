import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";

import "./styles.scss";

export default function Form_S_O_1({ onSubmit }) {
    const [selectedValue, setSelectedValue] = useState("");
    const [textarea, setTextarea] = useState("");

    const handleChange = (event) => {
        if(event.target.value === "yes" || event.target.value === "no") {
            setSelectedValue(event.target.value);
        }
        onSubmit({ trouble: (event.target.value === "yes"? true: false), description : textarea});
    };

    return (
        <section id="form-s-o-1">
            <div className="form-header">
                <div className="form-title">Queremos saber mais</div>
                <div className="form-description">
                    Está enfrentando algum problema que esteja impedindo o
                    andamento da sua pesquisa durante esse período? <br />
                    Conte-nos em detalhe
                </div>
            </div>

            <div className="form-opt">
                <div className="left-content">
                    <div className="option-header">Sim</div>
                    <Radio
                        checked={selectedValue === "yes"}
                        onChange={handleChange}
                        value="yes"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "A" }}
                        style={{
                            width: 48,
                            height: 48,
                            margin: "0 auto",
                        }}
                    />
                </div>
                <div className="right-content">
                    <div className="option-header">Não</div>
                    <Radio
                        checked={selectedValue === "no"}
                        onChange={handleChange}
                        value="no"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "B" }}
                        style={{
                            width: 48,
                            height: 48,
                            margin: "0 auto",
                        }}
                    />
                </div>
            </div>
            <div className="form-text">
                <textarea
                    value={textarea}
                    onChange={(e) => setTextarea(e.target.value)}
                    onBlur={handleChange}
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Descreva a situação do seu projeto aqui"
                ></textarea>
            </div>
        </section>
    );
}
