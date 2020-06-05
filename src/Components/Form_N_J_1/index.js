import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";

import "./styles.scss";

export default function Form_N_J_1({ onSubmit }) {
    const [selectedValue, setSelectedValue] = useState("");
    const [textarea, setTextarea] = useState("");

    const handleChange = (event) => {
        if (event.target.value === "yes" || event.target.value === "no") {
            setSelectedValue(event.target.value);
        }
        onSubmit({
            remuneration: event.target.value === "yes" ? false : true,
            description: textarea,
        });
    };

    return (
        <section id="form-n-j-1">
            <div className="form-header">
                <div className="form-title">Queremos saber mais</div>
                <div className="form-description">
                    Quais areas você possui mais afinidade? Quais tipos de
                    projeto você gostaria de estar envolvido? <br />
                    Conte-nos sobre as possíveis dificuldades que você está
                    tendo para iniciar ou estar em um trabalho científico
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
                    placeholder="Descreva detalhadamente"
                ></textarea>
            </div>
            <div className="form-opt">
                <div className="left-content">
                    <div className="option-header">
                        Gostaria de participar sem pretenção de ganhos
                    </div>
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
                    <div className="option-header">
                        Se possível, gostaria de incentivos como bolsa
                        remunerada
                    </div>
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
        </section>
    );
}
