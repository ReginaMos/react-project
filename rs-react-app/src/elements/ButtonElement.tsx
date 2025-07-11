import type { ButtonProps } from "../models/models"
import React from 'react';

export default class Button extends React.Component<ButtonProps> {
    render() {
        return (
            <button onClick={this.props.onAction} className={this.props.class}>
                {this.props.text}
            </button>
        )
    }
    
}