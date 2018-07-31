import * as React from "react";
import { Hello } from "./Hello";

interface HelloWorldContainerState {
    displayMessage: string;
}

interface WrapperProps {
    class?: string;
    mxform: mxui.lib.form._FormBase;
    style?: string;
}

interface HelloWorldContainerProps extends WrapperProps {
    displayMessage: string;
}

class HelloWorldContainer extends React.Component<HelloWorldContainerProps, HelloWorldContainerState> {
    constructor(props: HelloWorldContainerProps) {
        super(props);
        this.state = {
           displayMessage: ""
        };
    }

    componentDidMount() {
        this.setState({ displayMessage: this.props.displayMessage });
    }

    render() {
        return(
            <Hello
                message={this.state.displayMessage}
            />
        );
    }
}

export { HelloWorldContainerProps, HelloWorldContainer as default };
