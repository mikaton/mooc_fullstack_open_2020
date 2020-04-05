const calculateBmi = (weight: number, height: number): string => {
  let heightInMeters = height / 100;
  const bmi: number = weight / (heightInMeters ** 2);
  
  if(bmi < 18.5) {
    return "Underweight"
  } else if(bmi >= 18.5 && bmi < 25) {
    return "Normal (healthy weight)"
  } else if(bmi > 25 && bmi < 30) {
    return "Overweight"
  } else if(bmi > 30) {
    return "Obese"
  }
}

console.log(calculateBmi(115, 175));