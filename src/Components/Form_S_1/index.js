import React, {useState} from "react";
import Radio from "@material-ui/core/Radio";

import "./styles.scss";

export default function Form_S_1({onSubmit}) {
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
         onSubmit(
            {status_project : event.target.value},
        );
    };

    return (
        <>
            <div className="form-header">
                <div className="form-title">Muito bem</div>
                <div className="form-description">Como está a situação do seu projeto?</div>
            </div>

            <div className="form-options">
                <div className="left-content">
                    <div className="option-header">Parado</div>
                    <Radio
                        checked={selectedValue === "paused"}
                        onChange={handleChange}
                        value="paused"
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
                    <div className="option-header">Em andamento</div>
                    <Radio
                        checked={selectedValue === "ongoing"}
                        onChange={handleChange}
                        value="ongoing"
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
