import { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({persons, setPersons, setMessage, setMessageStyle}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = event => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length === 0) {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson.data))
          setMessage(`Added ${newName}`)
          setMessageStyle(
            {
              marginBottom: 8,
              padding: 8,
              backgroundColor: 'lightgrey',
              borderStyle: 'solid',
              borderRadius: 4,
              borderColor: 'green',
              color: 'green'
            }
          )
          setTimeout(() => {
            setMessage(null)
            setMessageStyle(null)
          }, 5000)
        }).catch(error => {
          setMessage(error.response.data.error)
          setMessageStyle(
            {
              marginBottom: 8,
              padding: 8,
              backgroundColor: 'lightgrey',
              borderStyle: 'solid',
              borderRadius: 4,
              borderColor: 'red',
              color: 'red'
            }
          )
          setTimeout(() => {
            setMessage(null)
            setMessageStyle(null)
          }, 5000)
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const selectedPerson = persons.find(person => person.name === newName)
        const changedPerson = {
          ...selectedPerson,
          number: newNumber
        }

        personService
          .update(changedPerson)
          .then( changedPerson => {
            setPersons(persons.map(person =>
              person.id === changedPerson.data.id ?
                changedPerson.data
              :
                person
            ))
            setMessage(`Updated ${changedPerson.data.name}`)
            setMessageStyle(
              {
                marginBottom: 8,
                padding: 8,
                backgroundColor: 'lightgrey',
                borderStyle: 'solid',
                borderRadius: 4,
                borderColor: 'green',
                color: 'green'
              }
            )
            setTimeout(() => {
              setMessage(null)
              setMessageStyle(null)
            }, 5000)
          }).catch(error => {
            setMessage(error.response.data.error)
            setMessageStyle(
              {
                marginBottom: 8,
                padding: 8,
                backgroundColor: 'lightgrey',
                borderStyle: 'solid',
                borderRadius: 4,
                borderColor: 'red',
                color: 'red'
              }
            )
            setTimeout(() => {
              setMessage(null)
              setMessageStyle(null)
            }, 5000)
          })
      } else {
        alert(`${newName} is already added to phonebook`)
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  return (
    <form onSubmit={addName}>
        <div>
          {`name: `}
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          {`number: `}
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm