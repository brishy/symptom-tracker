const express = require('express');
const router = express.Router();
const symptomController = require('../controllers/symptomController');
const { createSymptom, getSymptoms, getSymptom, updateSymptom, deleteSymptom } = require('../controllers/SypmtomController');

// create a new symptom
router.post('/', createSymptom);

// get all symptoms
router.get('/', getSymptoms);

// get a specific symptom by id
router.get('/:id', getSymptom);

// update a specific symptom by id
router.put('/:id', updateSymptom);

// delete a specific symptom by id
router.delete('/:id', deleteSymptom);

module.exports = router;