import React from 'react';
import Content from './ContentComponent';
import Button from '../elements/ButtonElement';

export default class Main extends React.Component {
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
                Main Part
                <Content />
                <Button onAction={this.handleCrash} text="Crash App" />
            </main>
        );
    }
}
