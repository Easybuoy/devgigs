const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./config/database');
const gigs = require('./routes/gigs');

const app = express();

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index ROute
app.get('/', (req, res) => res.render('index', { layout: 'landing' }))
db.authenticate()
  .then(() => console.log('Db connected'))
  .catch((err) => console.log(err))

const port = process.env.PORT || 3000;

app.use('/gigs', gigs)


app.listen(port, console.log(`Server started on port ${port}`));