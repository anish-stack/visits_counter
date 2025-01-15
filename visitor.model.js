const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    website: { type: String, required: true, unique: true },
    visits: { type: Number, default: 0 },
}, { timestamps: true });

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
