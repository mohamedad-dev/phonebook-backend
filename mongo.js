const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://mohamedaminedammak98:${password}@cluster0.7uskgiz.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length === 3) {
  Person.find({}).then((people) => {
    console.log('phonebook:')
    people.forEach((person) => console.log(person.name, person.number))
    mongoose.connection.close()
  })
}
