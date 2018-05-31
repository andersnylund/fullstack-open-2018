import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
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

    const createdPersons = this.state.persons
      .filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
      .map(person => {
        return (<tr key={person.name}>
          <td>{person.name}</td>
          <td>{person.number}</td>
        </tr>)
      });

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <div>
          rajaa näytettäviä: <input value={this.state.filter} onChange={this.handleFilterChange} />
        </div>
        <h2>Lisää uusi henkilö</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {createdPersons}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
