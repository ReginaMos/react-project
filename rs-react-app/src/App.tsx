import React from 'react';
import './App.css';
import Main from './components/Main';
import Header from './components/Header';
import type { ItemState, PersonShort } from './models/models'

export default class App extends React.Component<{}, ItemState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: [],
    };
  }

  fetchPeople = async () => {
    const url = "https://www.swapi.tech/api/people";

    try {
      const response = await fetch(url);
      const data = await response.json();
      const results = data.results || [];
      const detailedItems = await Promise.all(
        results.map(async (item: PersonShort) => {
          try {
            const res = await fetch(item.url);
            const details = await res.json();
            const person = details.result.properties;

            return {
              name: item.name,
              description: `Gender: ${person.gender}, Birth year: ${person.birth_year}, Height: ${person.height}, Eye color: ${person.eye_color}`,
            };
          } catch (error) {
            console.error(`Error fetching description for ${item.name}`, error);
            return {
              name: item.name,
              description: 'Description unavailable',
            };
          }
        })
      );

      this.setState({ items: detailedItems });
        console.log(detailedItems);
      } catch (err) {
        console.error("API error:", err);
      }
  };


  componentDidMount() {
    this.fetchPeople();
  }

  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}
