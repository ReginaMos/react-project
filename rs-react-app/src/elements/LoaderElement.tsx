import React from 'react';
import '../styles/Loader.css'

export default class Button extends React.Component {
  render() {
    return (
      <>
        <div className="loader">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>
        <div className="overlay"></div>
      </>
    );
  }
}
