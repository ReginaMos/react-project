import React from 'react';
import Search from '../elements/SearchElement';
import '../styles/Header.css'

type Props = {
  onSearch: (value: string) => void;
};


export default class Header extends React.Component<Props> {
    render() {
        return (
            <header>
                <Search onSearch={this.props.onSearch}/>
            </header>
        )
    }
}