const mongoose = require('mongoose')

//  1. SETUP CMD ARGUMENTS:
if (process.argv.length < 3) {
  console.log('Please provide the password as the first argument')
  console.log('Then phone as second argument and name as third argument')
  process.exit(1)
}
//  2. ESTABLISH CONNECTION TO DATABASE
const password = process.argv[2]

const url = `mongodb+srv://LDL96:${password}@cluster0.r2mtgtq.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

//  3. WE DEFINE THE SCHEMA & MATCHING MODEL
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

//  4. SAVE OR PRINT PERSONS

if (process.argv.length == 5){
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log('added '+result.name+' number '+result.number+' to phonebook')
    mongoose.connection.close() 
  })
}

if (process.argv.length == 3){
  console.log("phonebook:")
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name+" "+person.number)
    })
    mongoose.connection.close()
  })
}
