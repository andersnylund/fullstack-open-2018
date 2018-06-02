import React from 'react'

const Person = ({ person, onClickDelete }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={onClickDelete(person.id)}>Poista</button></td>
    </tr>
  )
}

export default Person