import React from 'react';
import type { ChipsProps } from '../models/models';
import '../styles/Chips.css';

export default class Chips extends React.Component<ChipsProps> {
  render() {
    return (
      <div className="chips">
        <p>{this.props.text}</p>
      </div>
    );
  }
}
