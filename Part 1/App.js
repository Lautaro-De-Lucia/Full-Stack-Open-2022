import { useState } from 'react'

//  COMPONENT DEFINITIONS:

//  Statistics Component.
const Statistics = ({good,neutral,bad}) =>{
  
  if (good == 0 && neutral == 0 && bad == 0) {
    return (
      <div>
        <h4>No Feedback Given</h4>
      </div>
    )
  }

  return(
    <>
      <table>
        <StatisticLine text = {"Good: "} value = {good}/>
        <StatisticLine text = {"Neutral: "} value = {neutral}/>
        <StatisticLine text = {"Bad: "} value = {bad}/>
        <StatisticLine text = {"Average: "} value = {(good-bad)/3}/>
        <StatisticLine text = {"Positive: "} value = {(good/(good+neutral+bad)) * 100 + " %"}/>
      </table>
    </>
  )

}

//  StatisticLine component.
const StatisticLine = ({text,value}) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </>
)

//  Button Component.
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {

  //  STATE HOOKS DEFINITIONS:

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //  EVENT HANDLER DEFINITIONS:

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  //  JSX CODE:

  return (
    <div>
      <h1>Give Feedback</h1> 
      <Button onClick={handleGoodClick} text={"good"}/>
      <Button onClick={handleNeutralClick} text={"neutral"}/>
      <Button onClick={handleBadClick} text={"bad"}/>
      <h1>Statistics</h1> 
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;
