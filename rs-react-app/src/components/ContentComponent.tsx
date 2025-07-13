import React from 'react';
import type { ItemState } from '../models/models';
import ContentItem from './ContentItem';

export default class Content extends React.Component<ItemState> {
  render() {
    return (
      <div>
        <h2>Results:</h2>

        <div className="item main">
          <div className="item-name">Item Name</div>
          <div className="item-description">Item Description</div>
        </div>

        {this.props.items.map((item, index) => (
          <ContentItem
            name={item.name}
            description={item.description}
            key={index}
          />
        ))}
      </div>
    );
  }
}
