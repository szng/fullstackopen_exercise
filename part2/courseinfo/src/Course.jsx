import React from 'react'

const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>)
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, value) => {
    return sum + value.exercises
  }, 0)
  return (
    <b>Total of {total} exercises</b>
  )
}

const Course = ({ course }) => {

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course