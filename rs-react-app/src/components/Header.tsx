import React from 'react';
import Search from '../elements/SearchElement';
import type { PropsFunction } from '../models/models';
import '../styles/Header.css';

export default class Header extends React.Component<PropsFunction> {
  render() {
    return (
      <header>
        <Search onSearch={this.props.onSearch} />
      </header>
    );
  }
}
