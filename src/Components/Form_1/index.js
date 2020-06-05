import React, { useState } from "react";
import { ReactComponent as Teacher } from "../../assets/svg/teacher.svg";
import { ReactComponent as Student } from "../../assets/svg/student.svg";
import Radio from "@material-ui/core/Radio";

import "./styles.scss";

export default function Form_1({ onSubmit }) {
    const [selectedValue, setSelectedValue] = useState("");
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        onSubmit({ type: event.target.value });
    };

    return (
        <>
            <div className="form-header">
                <div className="form-title">Vamos começar</div>
                <div className="form-description">Selecione o que você é:</div>
            </div>

            <div className="form-options" id="form1">
                <div className="left-content">
                    <div className="form-pic">
                        <Teacher style={{ width: 256, height: 256 }} />
                    </div>
                    <div className="option-header">Professor / Orientador</div>
                    <Radio
                        checked={selectedValue === "teacher"}
                        onChange={handleChange}
                        value="teacher"
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
                    <div className="form-pic">

                        <Student style={{ width: 256, height: 256 }} />
                    </div>
                    <div className="option-header">Estudante / Pesquisador</div>
                    <Radio
                        checked={selectedValue === "student"}
                        onChange={handleChange}
                        value="student"
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
        </>
    );
}
