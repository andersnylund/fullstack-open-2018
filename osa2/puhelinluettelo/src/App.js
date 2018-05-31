import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.newName !== '') {

      const newPerson = { name: this.state.newName };
      const persons = this.state.persons.concat(newPerson);

      this.setState({ 
        persons,
        newName: '' 
      })
    }
  };

  handleInputChange = (event) => {
    this.setState({ newName: event.target.value })
  };

  render() {

    const createPersons = this.state.persons.map(person => <li key={person.name}>{person.name}</li>)

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleInputChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {createPersons}
        </ul>
      </div>
    )
  }
}

export default App
