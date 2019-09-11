import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => ( 
    <button onClick = {handleClick}>{text}</button>
)

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))
  const [mostVotes, setMostVotes] = useState([0, 0])
  
  //const [mostVotes, setMostVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))

  const handleRandomclick = () => {
        setSelected(Math.floor(Math.random()*anecdotes.length))
        console.log(selected)
        console.log(votes)
    }

 

  const handleVoteClick = () => {
    const votesCopy = [...votes];
    const mostVotesCopy = [...mostVotes];

    votesCopy[selected] += 1;
    setVotes(votesCopy)

    if (mostVotesCopy[1] < votesCopy[selected]){
      mostVotesCopy[0] = selected
      mostVotesCopy[1] = votesCopy[selected]

      setMostVotes(mostVotesCopy)
    }

  }


  return (
    <div>
      <h2>Enjoy and vote random anecdotes</h2>
        <Button handleClick = {handleRandomclick} text = "Next anecdote"/>
        <Button handleClick = {handleVoteClick} text = "Vote this anecdote"/>
      <p>"{props.anecdotes[selected]}"</p>
      <p>Anecdote has {votes[selected]} votes.</p>
      <h2>Anecdote with most votes:</h2>
      <p>"{props.anecdotes[mostVotes[0]]}"</p>
      <p>Anecdote has {mostVotes[1]} votes.</p>
      <p></p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)