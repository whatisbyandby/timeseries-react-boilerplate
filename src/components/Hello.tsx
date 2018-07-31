import * as React from "react";
import "../ui/style.css";

export interface HelloProps { message: string; }

export const Hello: React.SFC<HelloProps> = (props) => (
    <div className="main-div">
        <h1>{props.message}</h1>
    </div>
);
