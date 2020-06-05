import React, {useState} from "react";
import Radio from "@material-ui/core/Radio";

import "./styles.scss";

export default function Form_1({onSubmit}) {
    const [selectedValue, setSelectedValue] = useState();

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
         onSubmit(
            {joined_project: event.target.value === "yes"? true : false},
        );
    };

    return (
        <>
            <div className="form-header">
                <div className="form-title">Antes de tudo</div>
                <div className="form-description">Precisamos saber se você já está integrado a um projeto de pesquisa:</div>
            </div>

            <div className="form-options">
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
        </>
    );
}
