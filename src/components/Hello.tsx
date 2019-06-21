import * as React from "react";
import "../ui/style.css";
import HelloWorldContainter from "./HelloWorldContainer";

export interface HelloProps {
    className: string | undefined;
    message: string;
    attributeMessage: string | number | boolean | null;
    style: string | undefined;
}

export const Hello: React.SFC<HelloProps> = (props) => (
    <div className={`${props.className}`.trim()} style={HelloWorldContainter.parseStyle(props.style)}>
        <h1>{props.message}</h1>
        <h3>{props.attributeMessage}</h3>
    </div>
);
