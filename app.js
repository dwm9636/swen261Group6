const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
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
        res.send('<script>alert("Correct"); window.location.href="/";</script>');
      } else {
        res.send('<script>alert("Incorrect"); window.location.href="/";</script>');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('<script>alert("Error"); window.location.href="/";</script>');
    }
  });

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
