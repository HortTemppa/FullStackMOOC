import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddContact from './components/AddContact'
import NumbersList from './components/NumbersList'
import contactService from './services/contact'
import AddNotification from './components/AddNotification'



const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState(' ')
  const [ newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [deleteId, setDeleteId] = useState()
  const [message, setMessage] = useState('')
  const [goodMessage, setGoodMessage] = useState(true)


  useEffect(() => {
    contactService
      .getAllPersons()
        .then(response =>{
          setPersons(response.data)
        })
    }, [])


  useEffect(() => {
    if (deleteId === undefined){
      return
    }

    else {
      contactService
        .deleteContact(deleteId)
          .then(() =>
          contactService
            .getAllPersons()
            .then(response => {
            console.log(response.data)
            setPersons(response.data)
            setDeleteId()
          } 
      ))  
    }
  }, [deleteId])


  const addContact = (event) => {
    event.preventDefault()
    
    const contactObject = {
      name: newName,
      number: newNumber,
    }
    console.log(persons)

    const listOfContacts = persons.map(persons => 
      persons.name)

      if(!listOfContacts.includes(newName)){

        contactService
          .createContact(contactObject)
          .then (response => {
            console.log(response)
            setPersons(persons.concat(response.data))

            const notificationName = newName
            setGoodMessage(true)
            setMessage(`${notificationName} has been added to the list of contacts.`)
            setTimeout(() => {
              setMessage(null)
            }, 2000)

            setNewName('')
          })

    

      }
    else {
      setGoodMessage(false)
      setMessage(`${newName} has already been added to the list of contacts.`)
      
    }
  }

  const handleDeleteButton = (event) => {
    if (window.confirm(`Are you sure you want to delete the contact?`)){
    setDeleteId(event.target.value)
    setGoodMessage(true)
    setMessage('Contact deleted')
    setTimeout(() => {
      setMessage(null)
    }, 2000)
      
    }
    else {
      return
    }
  }


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  


  return (
    <div>
      <h1>Phonebook</h1 >
      <h2>Add a new contact</h2>
      <AddNotification goodMessage = {goodMessage} notification = {message}/>
      <AddContact addContact = {addContact} newName = {newName} newNumber = {newNumber} handleNewName = {handleNewName} handleNewNumber = {handleNewNumber}/>
      <h2>Contacts</h2>
      <Filter filter = {filter} handleFilterChange = {handleFilterChange}/>
      <NumbersList numbers = {persons} filter = {filter} handleDeleteButton = {handleDeleteButton} deleteContact = {contactService.deleteContact}/>
    </div>
  )

}

export default App