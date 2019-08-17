import React, { useState, useEffect } from "react";

function Button({ handleClick, name }) {
  return (
    <div>
      <button onClick={handleClick}>{name}</button>
    </div>
  );
}

function Statistic({ name, value }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
}

function Statistics(props) {
  if (props.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic name="good" value={props.good} />
          <Statistic name="neutral" value={props.neutral} />
          <Statistic name="bad" value={props.bad} />
          <Statistic name="all" value={props.all} />
          <Statistic name="average" value={props.average} />
          <Statistic name="positive" value={props.positive + " %"} />
        </tbody>
      </table>
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
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  useEffect(() => {
    setAverage(good - bad / 3);
    setPositive((good * 100) / all);
  }, [good, bad, all]);

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGood} name="good" />
      <Button handleClick={handleNeutral} name="neutral" />
      <Button handleClick={handleBad} name="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
}

export default App;
