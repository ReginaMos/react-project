import React from 'react';
import Search from '../elements/SearchElement';

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