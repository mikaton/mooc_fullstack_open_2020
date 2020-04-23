import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: 'Losing your mind with React & TypeScript error messages';
}

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

type HeaderProps = {
  name: string;
};

const Header = ({ name }: HeaderProps) => {
  return <h1>{name}</h1>;
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <p>
          <b>{part.name}</b> Exercises: {part.exerciseCount} Description:{' '}
          {part.description}
        </p>
      );
    case 'Losing your mind with React & TypeScript error messages':
      return (
        <p>
          <b>{part.name}</b> Exercises: {part.exerciseCount} Description:{' '}
          {part.description}
        </p>
      );
    case 'Using props to pass data':
      return (
        <p>
          <b>{part.name}</b> {part.exerciseCount} Group projects:{' '}
          {part.groupProjectCount}
        </p>
      );
    case 'Deeper type usage':
      return (
        <p>
          <b>{part.name}</b> Exercises: {part.exerciseCount} Description:{' '}
          {part.description} Submit link for exercises:{' '}
          <a href={part.exerciseSubmissionLink}>
            {part.exerciseSubmissionLink}
          </a>
        </p>
      );
    default:
      return assertNever(part);
  }
};

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

const Total: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  const total = parts.reduce(
    (carry: number, part: CoursePart) => carry + part.exerciseCount,
    0
  );
  return <b>Total number of exercises: {total}</b>;
};

const App: React.FC = () => {
  const courseName = 'Half Stack application development';

  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    },
    {
      name: 'Losing your mind with React & TypeScript error messages',
      exerciseCount: 1,
      description: 'Because who the fuck makes them so unreadable?',
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
