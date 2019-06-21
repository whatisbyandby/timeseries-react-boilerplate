import * as React from "react";
import { Hello } from "./Hello";

interface HelloWorldContainerState {
    displayMessage: string;
    messageAttribute: string | number | boolean | null;
}

interface WrapperProps {
    mxObject?: mendix.lib.MxObject;
    class?: string;
    mxform: mxui.lib.form._FormBase;
    style?: string;
}

interface HelloWorldContainerProps extends WrapperProps {
    displayMessage: string;
    messageAttribute: string | null;
}

class HelloWorldContainer extends React.Component<HelloWorldContainerProps, HelloWorldContainerState> {
    private subscriptionHandles: number[];

    constructor(props: HelloWorldContainerProps) {
        super(props);

        this.subscriptionHandles = [];
        this.state = this.updateState(props.mxObject);
        this.subscriptionCallback = this.subscriptionCallback.bind(this);

        this.state = {
           displayMessage: "",
           messageAttribute: ""
        };
    }

    componentWillReceiveProps(newProps: HelloWorldContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState(this.updateState(newProps.mxObject));
    }

    componentWillUnmount() {
        this.subscriptionHandles.forEach(mx.data.unsubscribe);
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            this.subscriptionHandles.push(mx.data.subscribe({
                callback: this.subscriptionCallback,
                guid: mxObject.getGuid()
            }));
        }
    }

    private updateState(mxObject = this.props.mxObject): HelloWorldContainerState {
        return {
            messageAttribute: this.getAttributeValue(this.props.messageAttribute, mxObject),
            displayMessage: this.props.displayMessage
        };
    }

    private subscriptionCallback() {
        this.setState(this.updateState());
    }

    private getAttributeValue(attribute: string | null, mxObject?: mendix.lib.MxObject): string {
        if (mxObject && attribute) {
            return mxObject.get(attribute) as string;
        }
        return "";
    }

    render() {
         return(
            <Hello
                message={this.state.displayMessage}
                attributeMessage={this.state.messageAttribute}
            />
        );
    }
}

export { HelloWorldContainerProps, HelloWorldContainer as default };
