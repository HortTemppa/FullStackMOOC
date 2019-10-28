import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAllPersons = () => {
    return  axios
    .get(baseUrl)
}

const createContact = (newObject) => {
    return axios 
    .post(baseUrl, newObject)
}

const deleteContact = (id) => {
    return axios
      .delete(`${baseUrl}/${id}`)
}
export default {getAllPersons, createContact, deleteContact}