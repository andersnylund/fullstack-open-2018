import React from 'react'
import Person from './Person'

const PersonList = ({ people, filter, onClickDelete }) => {

  const createdPeople = people
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => {
      return (
        <Person
          key={person.id}
          person={person}
          onClickDelete={onClickDelete}>
        </Person>
      )
    })

  return (
    <table>
      <tbody>
        {createdPeople}
      </tbody>
    </table>
  )
}

export default PersonList