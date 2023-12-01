const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Project');

// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key', // Change this to a random string for security
  resave: false,
  saveUninitialized: true
}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query the database to find a user with the provided credentials
    const user = await User.findOne({ username, password });

    if (user) {
      // Store user information in the session
      req.session.userId = user._id;
      res.redirect('/curation'); // Redirect to the page
    } else {
      res.render('login', { error: 'Incorrect username or password' }); // Render error message
    }
  } catch (error) {
    console.error(error);
    res.status(500).render('login', { error: 'An error occurred' });
  }
});

// New route for curation page
app.get('/curation', (req, res) => {
  // Check if the user is authenticated (session contains user information)
  if (req.session.userId) {
    // Render the cooking information page
    res.render('curation');
  } else {
    // Redirect to login if not authenticated
    res.redirect('/');
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
