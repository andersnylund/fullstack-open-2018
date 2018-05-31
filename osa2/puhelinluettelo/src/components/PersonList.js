import React from 'react'

const PersonList = ({ persons, filter }) => {

    const createdPersons = persons
      .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(person => {
        return (<tr key={person.name}>
          <td>{person.name}</td>
          <td>{person.number}</td>
        </tr>)
      });

    return ( 
        <table>
          <tbody>
            {createdPersons}
          </tbody>
        </table>
    )
}

export default PersonList