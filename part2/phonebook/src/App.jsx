import { useState } from 'react'

const Filter = ({ handleShowChange }) => {
  return (
    <div>
      filter shown with<input name='show' onChange={handleShowChange} />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input name='name' value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input name='number' value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ needToShow }) => {
  return (
    <div>
      {needToShow.map((person) => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  let id = 5

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [show, setShow] = useState('')

  const needToShow =
    persons.filter(person =>
      person.name.toLowerCase().startsWith(show.toLocaleLowerCase()))

  const handleChange = (stateFun) => {
    return (event) => stateFun(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const isSame = persons.reduce((flag, person) => {
      return flag || (person.name === newName)
    }, false)
    if (isSame) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { name: newName, number: newNumber, id: id }
      id += 1
      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleShowChange={handleChange(setShow)} />

      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleChange(setNewName)} handleNumberChange={handleChange(setNewNumber)} />
      <h2>Numbers</h2>
      <Person needToShow={needToShow} />
    </div>
  )
}

export default App
