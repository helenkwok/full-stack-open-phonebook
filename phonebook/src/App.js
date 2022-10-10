import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification
        message={message}
        messageStyle={messageStyle}
      />

      <Filter
        filter={filter}
        setFilter={setFilter}
      />

      <h2>add a new</h2>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setMessageStyle={setMessageStyle}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        setPersons={setPersons}
        filter={filter}
        setMessage={setMessage}
        setMessageStyle={setMessageStyle}
      />
    </div>
  )
}

export default App