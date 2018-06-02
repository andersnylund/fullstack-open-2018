import React from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import personService from './services/personService'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      people: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    personService.getAll()
      .then(people => {
        this.setState({ people })
      })
      .catch(error => {
        alert(error)
      })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const existingNames = this.state.people.map(person => person.name);
    const nameToAdd = this.state.newName;
    const numberToAdd = this.state.newNumber;

    if (nameToAdd !== '') {
      if (!existingNames.includes(nameToAdd)) {

        const newPerson = {
          name: nameToAdd,
          number: numberToAdd
        }

        personService.create(newPerson)
          .then(p => {
            const people = this.state.people.concat(p);
            this.setState({
              people,
              newName: '',
              newNumber: ''
            })
          })
          .catch(error => {
            alert(error)
          })
      } else {
        alert('Henkilö on jo listassa!')
      }
    }
  };

  handleDelete = (id) => {
    return () => {
      const person = this.state.people.find(p => p.id === id)
      if (window.confirm(`Poistetaanko ${person.name} ?`)) {
        personService.remove(id)
          .then(p => {
            this.setState({
              people: this.state.people.filter(p => p.id !== id)
            })
          })
          .catch(error => {
            alert(error)
          })
      }
    }
  }

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
        <Filter
          filter={this.state.filter}
          onFilterChange={this.handleFilterChange}>
        </Filter>
        <h2>Lisää uusi henkilö</h2>
        <PersonForm
          onSubmit={this.handleSubmit}
          onNameChange={this.handleNameChange}
          onNumberChange={this.handleNumberChange}
          newName={this.state.newName}
          newNumber={this.state.newNumber}>
        </PersonForm>
        <h2>Numerot</h2>
        <PersonList
          people={this.state.people}
          filter={this.state.filter}
          onClickDelete={this.handleDelete}>
        </PersonList>
      </div>
    )
  }
}

export default App
