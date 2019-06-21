import * as React from "react";
import "../ui/style.css";

export interface HelloProps {
    message: string;
    attributeMessage: string | number | boolean | null;
}

export const Hello: React.SFC<HelloProps> = (props) => (
    <div className="main-div">
        <h1>{props.message}</h1>
        <h3>{props.attributeMessage}</h3>
    </div>
);
