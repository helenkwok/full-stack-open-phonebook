const Person = require('../models/person')

const initialPersons = [
  {
    name: 'Arto Vihavainen',
    number: '045-1232456',
  },
  {
    name: 'Ada Lovelace',
    number: '040-1231236',
  },
]

const personsInDb = async () => {
  const persons = await Person.find({})
  return persons.map((person) => person.toJSON())
}

module.exports = {
  initialPersons,
  personsInDb,
}
