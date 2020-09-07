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

  // const parseDailyHoursAndTarget = (args: Array<string>): DailyHoursAndTarget => {
  //   console.log(args)
  //   if (args.length < 4) throw new Error('Not enough arguments');
    
  //   const tempArr: Array<number> = []

  //   let testi = args[2].replace(/[^0-9\.]+/g," ").split(" ")

  //   for (let i = 0; i < testi.length; i++) {
  //       if( !isNaN(Number(testi[i])) && testi[i] !== '') {
  //           console.log('testi: ', testi[i])
  //           tempArr.push(Number(testi[i]))
  //       }
  //   }
    
  //   return {
  //     target: Number(args[3]),
  //     dailyExerciseHours: tempArr,
  //   };
  // };

  const parseDailyHoursAndTarget = (args: Array<string>): DailyHoursAndTarget => {

    if (args.length < 4) throw new Error('Not enough arguments');
    
    const tempArr: Array<number> = [];

      for (let i = 1; i < args.length; i++) {
          if (!isNaN(Number(args[i]))) {
              tempArr.push(Number(args[i]));
          } 
      }

    return {
      target: tempArr[0],
      dailyExerciseHours: tempArr.splice(1,tempArr.length)
    };
  };
  
  export const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
    
    let trainingDays = 0;
    dailyExerciseHours.forEach(hours => {
        if (hours > 0) {
            trainingDays++;
        }
    });

    const averageHours = dailyExerciseHours.reduce((a,b) => a+b) / dailyExerciseHours.length;

    let success;
    if(averageHours < target) {
        success = false;
    } else {
        success = true;
    }

    const ratingPercentage = (averageHours / target) * 100;
    let rating;
    let ratingDescription;

    if (ratingPercentage >= 100) {
        rating = 3;
        ratingDescription = 'very good';
    } else if (ratingPercentage > 80) {
        rating = 2;
        ratingDescription = 'good but you could do better';
    } else {
        rating = 1;
        ratingDescription = 'better than nothing';
    }

    return {
        periodLength: dailyExerciseHours.length,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average: averageHours
    };
  };

  

  try {
    const { dailyExerciseHours, target } = parseDailyHoursAndTarget(process.argv);
    console.log(calculateExercises(dailyExerciseHours, target));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }

