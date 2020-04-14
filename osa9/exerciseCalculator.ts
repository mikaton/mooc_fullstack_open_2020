interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgs = (args: string[]): number[] => {
  if (args.length < 4) throw new Error('Not enough arguments');
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i])))
      throw new Error('Provided values were not numbers!');
  }

  return args.map((arg) => Number(arg));
};

const calculateExercises = (exercises: number[], target: number): Result => {
  let sum = 0;
  let rating: number;
  let ratingDescription: string;
  const trainingDays = exercises.filter((e) => e > 0).length;

  for (let i = 2; i < exercises.length; i++) {
    sum += exercises[i];
  }
  const average = sum / exercises.length;

  if (average > target) {
    rating = 3;
    ratingDescription = 'Great!!';
  } else if (average > target / 1.5) {
    rating = 2;
    ratingDescription = 'Not too shabby!';
  } else {
    rating = 1;
    ratingDescription = 'You could do better.';
  }

  const result = {
    periodLength: exercises.length - 3,
    trainingDays,
    success: target <= average ? true : false,
    rating,
    ratingDescription,
    target,
    average,
  };

  return result;
};

try {
  const exercises = parseArgs(process.argv);
  console.log(calculateExercises(exercises, exercises[2]));
} catch (e) {
  console.log('Error:', e.message);
}
