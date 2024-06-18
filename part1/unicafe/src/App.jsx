import { useState } from 'react'

const Header = (props) => {
  return <h1>{props.text}</h1>
}

const Statistics = (props) => {
  if (props.all == 0)
    return (<p>No feedback given</p>)
  return (
    <div>
      <h2>{props.text}</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={(props.good - props.bad) / props.all} />
          <StatisticLine text="positive" value={100 * props.good / props.all + '%'} />
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}
      </td>
    </tr>)
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleClick = (fun, value) => {
    setAll(all + 1)
    fun(value)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handleClick={() => handleClick(setGood, good + 1)} />
      <Button text="neutral" handleClick={() => handleClick(setNeutral, neutral + 1)} />
      <Button text="bad" handleClick={() => handleClick(setBad, bad + 1)} />
      <Statistics text="statistics" all={all} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
