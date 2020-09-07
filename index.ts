import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {

    const { height, weight } = req.query;

    if (!height ||!weight || isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(400).send({ error: 'malformatted parameters' });
    }

    res.send({height, weight, bmi: calculateBmi(Number(height), Number(weight))});
  });

  app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
      res.status(400).send({ error: 'Parameters missing' });
    }

    if (isNaN(target)) {
      res.status(400).send({ error: 'malformatted parameter' });
    }

    const newArray: Array<number> = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    daily_exercises.forEach((value: any) => {
      newArray.push(Number(value));
    });

    const result = calculateExercises(newArray, target);

    if (isNaN(result.average)) {
        res.status(400).send({ error: 'malformatted parameter' });
      }

   
    res.status(200).send(result);
  });
  
  const PORT = 3003;
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

