import React from 'react';
import Button from '../elements/ButtonElement';
import '../styles/Header.css'

type Props = {
  onSearch: (value: string) => void;
};

type State = {
  inputText: string;
};

export default class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const find = localStorage.getItem('search_ReginaMos') || "";
    this.state = {
      inputText: find
    }
  }

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: e.target.value });
    localStorage.setItem('search_ReginaMos', e.target.value);
  };

  handleClick = () => {
    this.props.onSearch(this.state.inputText);
  };

  render() {
    return (
      <div className="search">
        <input
          type="text"
          value={this.state.inputText}
          onChange={this.handleInput}
          placeholder="Search"
        />
        <Button onAction={this.handleClick} text='Find' class='find-btn'/>
      </div>
    );
  }
}
