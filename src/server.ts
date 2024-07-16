import express from 'express';
import PersonManager, { User, Person } from './pr2';

const app = express();
const port = 3000;

app.use(express.json());

const personManager = new PersonManager();

app.get('/persons', (req, res) => {
  const result = personManager.get();
  res.json(result);
});

app.post('/add-person', (req, res) => {
  const person: Person = req.body;
  personManager.add(person);
  res.json({ message: 'Person added successfully' });
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;
  const user = personManager.findUserByNameAndPassword(name, password);
  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
