import React from 'react';
import './App.css';
import Main from './components/Main';
import Header from './components/Header';
import type { ItemModel, ItemState, PersonShort } from './models/models'

export default class App extends React.Component<{}, ItemState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: [],
    };
  }

  deleteSpaces = (str: string) => {
    return str.replace(/\s+/g, '')
  }

  getPersonInfo = async (url: string, name: string) => {
    try {
      const res = await fetch(url);
      const details = await res.json();
      const person = details.result.properties;

      return {
        name: name,
        description: `Gender: ${person.gender}, Birth year: ${person.birth_year}, Height: ${person.height}, Eye color: ${person.eye_color}`,
      };
    } catch (error) {
      console.error(`Error fetching description for ${name}`, error);

      return {
        name: name,
        description: 'Description unavailable',
      };
    }
  }

  fetchPeople = async (find: string) => {
    const baseUrl = "https://www.swapi.tech/api/people";
    const searchTerm = this.deleteSpaces(find);
    const url = searchTerm ? `${baseUrl}/?name=${searchTerm}` : baseUrl;
    let detailedItems: ItemModel[] = [];
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (searchTerm) {
        const results = data.result || [];
        detailedItems = results.map((item: any) => ({
          name: item.properties.name,
          description: item.description,
        }));
      } else {
        const results = data.results || [];
        detailedItems = await Promise.all(
          results.map(async (item: PersonShort) => await this.getPersonInfo(item.url, item.name))
        );
      }
      

      this.setState({ items: detailedItems });
      } catch (err) {
        console.error("API error:", err);
      }
  };


  componentDidMount() {
    const find = localStorage.getItem('search_ReginaMos') || "";
    this.fetchPeople(find);
  }

  render() {
    return (
      <>
        <Header onSearch={this.fetchPeople} />
        <Main items={this.state.items}/>
      </>
    );
  }
}
