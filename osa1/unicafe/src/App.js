import React, {useState, useEffect} from 'react';

function Statistics({ average, positive }) {
  return (
    <div>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  );
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [positive, setPositive] = useState(0);
  const [average, setAverage] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  }

  useEffect(() => {
    setAverage(good - bad / 3);
    setPositive(good * 100 / all);
  });


  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <Statistics average={average} positive={positive} />
    </div>
  )

}

export default App;
