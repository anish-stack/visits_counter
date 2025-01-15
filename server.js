const express = require('express');
const mongoose = require('mongoose');
const Visit = require('./visitor.model');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7589;

app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get('/api/visit/:website', async (req, res) => {
    try {
        const { website } = req.params;
        let visit = await Visit.findOne({ website });
        if (visit) {
            visit.visits += 1;
            await visit.save();
        } else {

            visit = new Visit({ website, visits: 1 });
            await visit.save();
        }

        res.status(200).json({ message: 'Visit tracked successfully', visit });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/visit-count/:website', async (req, res) => {
    try {
        const { website } = req.params;
        const visit = await Visit.findOne({ website });

        if (visit) {
            res.status(200).json({ website, visits: visit.visits });
        } else {
            res.status(404).json({ message: 'Website not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
