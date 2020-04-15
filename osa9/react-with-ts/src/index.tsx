import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

interface Course {
  name: string
  exerciseCount: number
}

const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return <h1>{courseName}</h1>
}

const Content: React.FC<Course> = (props) => {
  return (
    <p>
      {props.name} {props.exerciseCount}
    </p>
  )
}

const Total: React.FC<{ courseParts: Course[] }> = ({ courseParts }) => {
  let total = courseParts.reduce(
    (carry: number, part: Course) => carry + part.exerciseCount,
    0
  )
  return <p>Number of exercises {total}</p>
}

const App: React.FC = () => {
  const courseName = 'Half Stack application development'
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ]

  return (
    <div>
      <Header courseName={courseName} />
      {courseParts.map((course) => (
        <Content
          key={course.name}
          name={course.name}
          exerciseCount={course.exerciseCount}
        />
      ))}
      <Total courseParts={courseParts} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
