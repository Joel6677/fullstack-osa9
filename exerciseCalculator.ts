import { ClientRequestArgs } from "http";
import { DH_NOT_SUITABLE_GENERATOR } from "constants";

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }

  interface DailyHoursAndTarget {
    target: number;
    dailyExerciseHours: Array<number>;
  }

  const parseDailyHoursAndTarget = (args: Array<string>): DailyHoursAndTarget => {
    console.log(args)
    if (args.length < 4) throw new Error('Not enough arguments');
    
    let tempArr: Array<number> = []

    let testi = args[2].replace(/[^0-9\.]+/g," ").split(" ")

    for (let i = 0; i < testi.length; i++) {
        if( !isNaN(Number(testi[i])) && testi[i] !== '') {
            console.log('testi: ', testi[i])
            tempArr.push(Number(testi[i]))
        }
    }
    
    return {
      target: Number(args[3]),
      dailyExerciseHours: tempArr,
    };
  };
  
  export const calculateResult = (dailyExerciseHours: Array<number>, target: number): Result => {
    
    let trainingDays = 0
    dailyExerciseHours.forEach(hours => {
        if (hours > 0) {
            trainingDays++
            console.log(trainingDays)
        }
    })

    const averageHours = dailyExerciseHours.reduce((a,b) => a+b) / dailyExerciseHours.length

    let success
    if(averageHours < target) {
        success = false
    } else {
        success = true
    }

    const ratingPercentage = (averageHours / target) * 100
    let rating 
    let ratingDescription

    if (ratingPercentage >= 100) {
        rating = 3
        ratingDescription = 'very good'
    } else if (ratingPercentage > 80) {
        rating = 2
        ratingDescription = 'good but you could do better'
    } else {
        rating = 1
        ratingDescription = 'better than nothing'

    }

    return {
        periodLength: dailyExerciseHours.length,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average: averageHours
    }
  }


  

  try {
    const { dailyExerciseHours, target } = parseDailyHoursAndTarget(process.argv);
    console.log(calculateResult(dailyExerciseHours, target));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }