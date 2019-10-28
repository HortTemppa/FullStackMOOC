import React from 'react'

const NumbersList = ({numbers, filter, handleDeleteButton, deleteContact}) => {

    if (numbers.length > 0){
    const filteredArray = numbers.filter((filtered) => {
  
    const lowerCaseFilter = filter.toLowerCase()
    const lowerCasePerson = filtered.name.toLowerCase()
  
    return lowerCasePerson.includes(lowerCaseFilter)
  })
  
  return filteredArray.map(filteredArray =>
    <p key = {filteredArray.id}>{filteredArray.name} {filteredArray.number} <button value = {filteredArray.id} onClick = {handleDeleteButton}>Delete Contact</button></p>)
  }
else{
  return null
} 
}

export default NumbersList