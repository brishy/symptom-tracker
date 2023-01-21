const Symptom = require('path/to/Symptom.js');

exports.createSymptom = async (req, res) => {
  try {
    // create a new symptom instance and save it to the database
    const symptom = new Symptom({
      date: req.body.date,
      systolic: req.body.systolic,
      diastolic: req.body.diastolic
    });
    await symptom.save();

    // return the created symptom to the client
    res.status(201).json({ symptom });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSymptoms = async (req, res) => {
  try {
    // find all symptoms in the database
    const symptoms = await Symptom.find();
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSymptom = async (req, res) => {
  try {
    // find a specific symptom by its id
    const symptom = await Symptom.findById(req.params.id);
    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' });
    }
    res.json(symptom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSymptom = async (req, res) => {
  try {
    // find the symptom by its id and update its fields
    const symptom = await Symptom.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' });
    }
    res.json(symptom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSymptom = async (req, res) => {
  try {
    // find the symptom by its id and remove it from the database
    const symptom = await Symptom.findByIdAndRemove(req.params.id);
    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' });
    }
    res.json({ message: 'Symptom deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
