import React from 'react';
import type { ItemModel } from '../models/models';

export default class ContentItem extends React.Component<ItemModel> {
  render() {
    return (
      <div className="item">
        <div className="item-name">{this.props.name}</div>
        <div className="item-description">{this.props.description}</div>
      </div>
    );
  }
}
