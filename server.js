const usersRouter = require('./routes/userRoutes')
const compression = require('compression')
const helmet = require('helmet')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
 mongoose = require('mongoose')

require('dotenv').config()

const app = express()
app.use(cors())
app.use(helmet())
app.use(compression()) //compress all routes
app.use(express.static('public'))
app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
console.log('Sending index.html file now.')
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
console.log('Setting up routes..')
app.use('/api', usersRouter);

//make connection to mongodb
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log("Connection successfull"))
.catch(err => { 
  console.error('App starting error:', err.stack);
  process.exit(1)  
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

module.exports = app;
