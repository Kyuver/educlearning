const pool = require('./db'); 
const express = require('express'); 
const cors = require('cors'); require('dotenv').config(); 
const app = express(); const PORT = process.env.PORT || 5000; 
app.use(cors()); app.use(express.json()); 
app.get('/', (req, res) => { res.send('Server is running!'); }); 
app.get('/test-db', async (req, res) => { try { const result = await pool.query('SELECT NOW()'); res.json(result.rows[0]); } catch (err) { res.status(500).json({ error: err.message }); } });
app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`); });