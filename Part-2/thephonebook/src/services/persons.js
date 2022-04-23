/*
We want to encapsulate server communication in a single module. This module with have functions that
will encapsulate the different HTTP requests. The module returns an object that has three functions: 
getAll, create, and update as its properties that deal with notes. 
The functions directly return the promises returned by the axios methods.
The App component will use 'import' to get access to the module:
*/ 

import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const delete_ = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

/*
export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}

since both the property fields and the variable names in the object are the same, 
it's enough to simply write the following in ES6 JavaScript:
*/

export default {getAll,create,update,delete_}

/*
In defining the object using this shorter notation, we make use of a new feature 
that was introduced to JavaScript through ES6, enabling a slightly more compact 
way of defining objects using variables.
*/ 