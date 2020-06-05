import React, {useState} from "react";
import Radio from "@material-ui/core/Radio";

import "./styles.scss";

export default function Form_N_1({onSubmit}) {
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        if(event.target.value === "wannajoin") {
            onSubmit(
                {wannajoin : true},
            );
        } else {
            onSubmit(
                {wannacreate : true},
            );
        }
    };

    return (
        <>
            <div className="form-header">
                <div className="form-title">Muito bem</div>
                <div className="form-description">Selecione uma àrea de seu interesse:</div>
            </div>

            <div className="form-options">
                <div className="left-content">
                    <div className="option-header">Quero participar de projetos de pesquisa</div>
                    <Radio
                        checked={selectedValue === "wannajoin"}
                        onChange={handleChange}
                        value="wannajoin"
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
                    <div className="option-header">Quero iniciar meu próprio projeto de pesquisa</div>
                    <Radio
                        checked={selectedValue === "wannacreate"}
                        onChange={handleChange}
                        value="wannacreate"
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
