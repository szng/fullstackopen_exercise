import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

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

const Person = ({ needToShow, handleDelete }) => {
  return (
    <div>
      {needToShow.map((person) => <div key={person.id}>
        <p style={{ display: 'inline' }}>{person.name} {person.number}</p>
        <button style={{ display: 'inline' }} onClick={() => handleDelete(person)}>delete</button>
      </div>)}
    </div>
  )
}

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [show, setShow] = useState('')
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [color, setColor] = useState('green')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
      if (window.confirm(`${newName} is already added to phonebook, 
        replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changePerson = { ...person, number: newNumber }
        personService
          .update(person.id, changePerson)
          .then(returnPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(
              `Added ${person.name}`
            )
            setColor('green')
            setTimeout(() => {
              setErrorMessage('')
            }, 5000);
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${person.name} has already been removed from server`
            )
            setColor('red')
            setTimeout(() => {
              setErrorMessage('')
            }, 5000);
          })
      }
    } else {
      const personObject = { name: newName, number: newNumber }
      personService
        .create(personObject)
        .then(returnPerson => {
          setPersons(persons.concat(returnPerson))
          setNewName('')
          setNewNumber('')
          setErrorMessage(
            `Added ${personObject.name}`
          )
          setColor('green')
          setTimeout(() => {
            setErrorMessage('')
          }, 5000);
        })
    }
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} color={color} />
      <Filter handleShowChange={handleChange(setShow)} />
      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleChange(setNewName)} handleNumberChange={handleChange(setNewNumber)} />
      <h2>Numbers</h2>
      <Person needToShow={needToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
