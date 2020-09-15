import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getPublicPatients());
});

router.post('/', (req, res) => {
    try {
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);
	} catch (error) {
		res.status(400).send(error.message);
	}
})

router.get('/:id', (req, res) => {
	const patient = patientService.findById(req.params.id);
	if (patient) {
	  res.send(patient);
	} else {
	  res.sendStatus(404).send('No patient found');
	}
  });

  router.post('/:id/entries', (req, res) => {
	const patient = patientService.findById(req.params.id);
	if (!patient) {
	  res.status(400).send('No patient found');
	} else {
	  const newEntry = toNewEntry(req.body);
	  const entry = patientService.addNewEntry(patient, newEntry);
	  res.send(entry);
	}
  });

export default router;
