import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { encryptWithPassword, decryptWithPassword } from './encryption.js';
import { users } from './auth.js';

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

const SECRET = "supersecretkey";

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hash = await bcrypt.hash(password, 10);
  users[username] = { password: hash };
  res.json({ message: "User registered successfully" });
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Encrypt
app.post('/encrypt', (req, res) => {
  const { text, password } = req.body;
  const result = encryptWithPassword(text, password);
  res.json({ result });
});

// Decrypt
app.post('/decrypt', (req, res) => {
  const { text, password } = req.body;
  const result = decryptWithPassword(text, password);
  res.json({ result });
});

// Fallback for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
