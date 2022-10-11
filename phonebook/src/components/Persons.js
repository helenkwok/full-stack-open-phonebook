import personService from '../services/persons'

const Persons = ({persons, setPersons, filter, setMessage, setMessageStyle}) => {
  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .remove(id)
        .then(result => {
          setPersons(persons.filter(person => person.name !== name))
          setMessage(`Removed ${name}`)
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
        })
        .catch(error => {
          setMessage(`Information of ${name} has already been removed from server`)
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
    }
  }
  return (
    <>
      {
        persons.filter(person =>
          person.name.toLowerCase()
          .includes(filter.toLowerCase(), 0)
        ).map(person =>
          <p key={person.name} data-testid='person'>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.name, person.id)}>delete</button>
          </p>
        )
      }
    </>
  )
}

export default Persons