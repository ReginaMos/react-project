import React from 'react';
import Content from './ContentComponent';
import Button from '../elements/ButtonElement';
import type { ItemState } from '../models/models'
import '../styles/Main.css'

export default class Main extends React.Component<ItemState> {
    state = {
        crash: false,
    };
  
    handleCrash = () => {
        this.setState({ crash: true });
    };

    render() {
        if (this.state.crash) {
            throw new Error('Oooops! Something went wrong!');
        }

        return (
            <main>
                <Content items={this.props.items}/>
                <Button onAction={this.handleCrash} text="Crash App" class='error-btn'/>
            </main>
        );
    }
}
