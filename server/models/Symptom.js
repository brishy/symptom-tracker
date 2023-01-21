const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const symptomSchema = new Schema({
    date: { type: Date, required: true },
    systolic: { type: Number, required: true },
    diastolic: { type: Number, required: true }
});

module.exports = mongoose.model('Symptom', symptomSchema);