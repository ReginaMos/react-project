import React from 'react';
import type { ItemState } from '../models/models';
import ContentItem from './ContentItem';

export default class Content extends React.Component<ItemState> {
  render() {
    return (
      <div>
        {this.props.items.length === 0 && (
          <h3>There aren`t any elements by your request...</h3>
        )}

        {this.props.items.length > 0 && (
          <>
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
          </>
        )}
      </div>
    );
  }
}
