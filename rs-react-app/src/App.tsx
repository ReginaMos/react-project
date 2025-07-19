import React from 'react';
import './App.css';
import Main from './components/Main';
import Header from './components/Header';
import Loader from './elements/LoaderElement';
import Chips from './elements/ChipsElement';
import type {
  ItemModel,
  ItemState,
  PersonShort,
  PersonFind,
} from './models/models';

export default class App extends React.Component<
  Record<string, never>,
  ItemState
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      isApiError: '',
    };
  }

  deleteSpaces = (str: string) => {
    return str.replace(/\s+/g, '');
  };

  getPersonInfo = async (url: string, name: string) => {
    try {
      const res = await fetch(url);
      const details = await res.json();
      const person = details.result;

      return {
        name: name,
        description: person.description,
      };
    } catch (error) {
      console.error(`Error fetching description for ${name}`, error);

      return {
        name: name,
        description: 'Description unavailable',
      };
    }
  };

  fetchPeople = async (find: string) => {
    this.setState({ isLoading: true });
    const baseUrl = 'https://www.swapi.tech/api/people';
    const searchTerm = this.deleteSpaces(find);
    const url = searchTerm ? `${baseUrl}/?name=${searchTerm}` : baseUrl;
    let detailedItems: ItemModel[] = [];

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (searchTerm) {
        const results = data.result || [];
        detailedItems = results.map((item: PersonFind) => ({
          name: item.properties.name,
          description: item.description,
        }));
      } else {
        const results = data.results || [];
        detailedItems = await Promise.all(
          results.map(
            async (item: PersonShort) =>
              await this.getPersonInfo(item.url, item.name)
          )
        );
      }

      this.setState({ items: detailedItems });
    } catch (err: unknown) {
      this.setState({ isLoading: false, isApiError: 'API error: ' + err });
    }
    this.setState({ isLoading: false });
  };

  componentDidMount() {
    const find = localStorage.getItem('search_ReginaMos') || '';
    this.fetchPeople(find);
  }

  render() {
    return (
      <>
        <Header onSearch={this.fetchPeople} />
        <Main items={this.state.items} />
        {this.state.isLoading && <Loader />}
        {this.state.isApiError && <Chips text={this.state.isApiError} />}
      </>
    );
  }
}
