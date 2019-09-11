import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )


const DisplayStatistics = ({clickAmount, text, reviewValue,}) => {

    if(clickAmount === 0) {
            return  (<tr>
                <td>{"No feedback has been given"}</td>
                    </tr>
                )
            }
    
        return ( 
                <tr><td>{text}</td><td>{reviewValue}</td></tr>
        )           
    }

const Headers = ({text}) =>
    <h1>{text}</h1>

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }


    return(
        <div>
        <div>
            <Headers text = "Please, give feedback"/>
            <Button handleClick = {handleGoodClick} text = "Good" />
            <Button handleClick = {handleNeutralClick} text = "Neutral" />
            <Button handleClick = {handleBadClick} text = "Bad" />
            <Headers text = "Statistics:"/>
        </div>
        <div>
            <table>
                <tbody>
                <DisplayStatistics  clickAmount = {good + bad + neutral} text = "Good" reviewValue = {good}/>
                <DisplayStatistics  clickAmount = {good + bad + neutral} text = "Neutral" reviewValue = {neutral}/>
                <DisplayStatistics  clickAmount = {good + bad + neutral} text = "Bad" reviewValue = {bad}/>
                <DisplayStatistics  clickAmount = {good + bad + neutral} text = "All" reviewValue = {good + bad + neutral}/>
                <DisplayStatistics  clickAmount = {good + bad + neutral} text = "Average" reviewValue = {(good - bad)/(good + bad + neutral)}/>
                <DisplayStatistics  clickAmount = {good + bad + neutral} text = "Positive" reviewValue = {good / (good + bad + neutral)}/>
                </tbody>
            </table>
        </div>
        </div> 
       
    )


    
}
ReactDOM.render(<App />, document.getElementById('root'));