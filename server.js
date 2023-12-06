const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb+srv://swengroup:swengroup@cluster0.whhfxzs.mongodb.net/DubaiProject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;


db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

function mapPricePointToString(pricePoint) {
  switch (parseInt(pricePoint)) {
    case 1:
      return '$';
    case 2:
      return '$$';
    case 3:
      return '$$$';
    case 4:
      return '$$$$';
    // Add more cases as needed
    default:
      return ''; // Handle unknown or invalid price points
  }
}

var searchResultsScheme = new mongoose.Schema ( {
    name: String,
    class: String,
    website: String,
    phoneNumber: String,
    pricePoint: String,
    tags: String,
    medicalCenter: String
}, {collection : 'SearchResults'});

searchResultsScheme.index({
  name: 'text',
  class: 'text',
  website: 'text',
  phoneNumber: 'text',
  pricePoint: 'text',
  tags: 'text',
  medicalCenter: 'text'
});

const Place = mongoose.model('Place', searchResultsScheme);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('http://localhost:4200');
});
// set up routes
app.get('/search', async (req, res) => {
  const searchTerm = req.query.term;
  console.log('Received search term:', searchTerm); // Log the received search term

  const regex = new RegExp(searchTerm, 'i');
  console.log('RegExp used:', regex); // Log the regular expression being used

  try {
    const places = await Place.find(
      { $text: { $search: searchTerm } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });

    const formattedPlaces = places.map(place => ({
      name: place.name,
      class: place.class,
      website: place.website,
      phoneNumber: place.phoneNumber,
      pricePoint: mapPricePointToString(place.pricePoint),
      tags: place.tags,
      medicalCenter: place.medicalCenter
      // Include other fields as needed
    }));

    console.log('Search results:', places); // Log the search results
    res.json(formattedPlaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 

var userSchema = new mongoose.Schema ( {
  username: String,
  password: String,
}, {collection : 'Users'});

const User = mongoose.model('User', userSchema); 

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken (you might want to validate other things too)
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create a new user and save to the database
    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct (you might want to use a password hashing library)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*app.get('/search', async (req, res) => {
    try {
      const places = await Place.find({}); // Static query without search term
  
      console.log('Search results:', places); // Log the search results
  
      res.json(places);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }); */


// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});