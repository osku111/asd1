import { useState } from 'react'

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  )
}

const PersonForm = ({ newName, setNewName, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter }) => {
  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h3>Numbers</h3>
      <ul>
        {filteredPersons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace' },
    { name: 'Dan Abramov' },
    { name: 'Mary Poppendieck' }
  ])
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.some(person => person.name === newName)) {
      setPersons([...persons, { name: newName }])
      setNewName('')
    } else {
      alert(`${newName} is already in the phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} setNewName={setNewName} addPerson={addPerson} />
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
