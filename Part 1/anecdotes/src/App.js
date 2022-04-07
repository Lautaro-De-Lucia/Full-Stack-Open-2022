import { useState } from 'react'

//  GLOBAL VARIABLES

var indexOfMax = 0

//  COMPONENT DEFINITIONS

//  Button Component.
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {

  //  VARIABLE DEFINITIONS:

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  //  STATE HOOKS DEFINITIONS:

  const [selected, setSelected] = useState(0)
  const [allVotes, setVote] = useState([0,0,0,0,0,0,0])

  //  EVENT HANDLER DEFINITIONS:

  const handleNextAnecdoteClick = () => setSelected(Math.floor(Math.random() * (anecdotes.length)));
  const handleVoteClick = () => {
    const copy = [...allVotes]
    copy[selected] += 1 
    setVote(copy)
    indexOfMax = allVotes.indexOf(Math.max(...allVotes))
  }

  //  JSX CODE:

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <h3>{anecdotes[selected]}</h3><br/>
      <Button onClick = {handleNextAnecdoteClick} text = {"Next anecdote"}/><br/>
      <Button onClick = {handleVoteClick} text = {"Vote"}/><br/>
      <h3>This anecdote currently has: {allVotes[selected]} votes </h3>
      <h1>Anecdote with most votes</h1>
      <h3>{anecdotes[indexOfMax]}</h3>
      <h3>It has {allVotes[indexOfMax]} votes </h3>
    </div>    
  )
}

export default App