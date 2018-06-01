import React from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const existingNames = this.state.persons.map(person => person.name);
    const nameToAdd = this.state.newName;
    const numberToAdd = this.state.newNumber;

    if (nameToAdd !== '') {
      if (!existingNames.includes(nameToAdd)) {
        const newPerson = {
          name: nameToAdd,
          number: numberToAdd
        };
        const persons = this.state.persons.concat(newPerson);
        this.setState({
          persons,
          newName: '',
          newNumber: ''
        })
      } else {
        alert('Henkilö on jo listassa!')
      }
    }
  };

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  };

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Filter filter={this.state.filter} onFilterChange={this.handleFilterChange}></Filter>
        <h2>Lisää uusi henkilö</h2>
        <PersonForm
          onSubmit={this.handleSubmit}
          onNameChange={this.handleNameChange}
          onNumberChange={this.handleNumberChange}
          newName={this.state.newName}
          newNumber={this.state.newNumber}>
        </PersonForm>
        <h2>Numerot</h2>
        <PersonList persons={this.state.persons} filter={this.state.filter}></PersonList>
      </div>
    )
  }
}

export default App
