import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
 

//dummy data
let users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'User' },
    { id: 3, name: 'Alice Smith', email: 'alice.smith@example.com', role: 'User' },
    { id: 4, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Admin' },
    { id: 5, name: 'Eva Brown', email: 'eva.brown@example.com', role: 'User' },
    {id: 6, name: "John Smith", email:"john.smith@example.com", role: 'Admin'}
]
  

// Getting all users
app.get('/api/users', (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new user
app.post('/api/users', (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Perform basic server-side validation
    if (!name || !email || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //used from internet to see if it find email matches
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const newUser = { id: users.length + 1, name, email, role };
    users.push(newUser);

    console.log('New user added:', newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id); 
    const deletedUser = users.find((user) => user.id === userId);

    if (!deletedUser) { //if the provided id is not found
      return res.status(404).json({ error: 'User not found' });
    }

    users = users.filter((user) => user.id !== userId);

    console.log('User deleted:', deletedUser);

    res.json(deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Global error handler for server errors 
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
