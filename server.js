var usersRouter = require('./routes/userRoutes');
var compression = require('compression')
var helmet = require('helmet')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
var mongoose = require('mongoose');

require('dotenv').config()

const app = express()
app.use(cors())
app.use(helmet())
app.use(compression()) //compress all routes
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//make connection to mongodb
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log("Connection successfull"))
.catch(err => { 
  console.error('App starting error:', err.stack);
  process.exit(1)  
});

app.use('/api', usersRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

module.exports = app;
