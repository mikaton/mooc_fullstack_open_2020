interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const calculateExercises = (exercises: Array<number>, target: number): Result => {
  let average, sum: number = 0;
  let rating: number;
  let ratingDescription: string;
  let trainingDays = exercises.filter(e => e > 0).length;

  exercises.forEach(e => sum += e);
  average = sum / exercises.length;
  
  if(average > target) {
    rating = 3;
    ratingDescription = 'Great!!';
  } else if(average > target / 1.5) {
    rating = 2;
    ratingDescription = 'Not too shabby!';
  } else {
    rating = 1;
    ratingDescription = 'You could do better.';
  }

  const result = {
    periodLength: exercises.length,
    trainingDays,
    success: target <= average ? true : false,
    rating,
    ratingDescription,
    target,
    average
  }
  
  return result;
  
}

const testExercises: Array<number> = [3, 0, 2, 4.5, 0, 3, 1];
console.log(calculateExercises(testExercises, 2));