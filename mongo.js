const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2] // password gotten from command line arguments

const url = `mongodb+srv://fullstack:${password}@cluster0.qtgrqld.mongodb.net/noteApp?retryWrites=true&w=majority` // db connection string

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content:String,
    important:Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content:'HTML is Easy',
    important:true,
})

Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })