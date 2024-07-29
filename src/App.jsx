import { useState } from 'react'


const Button = ({handleClick, text}) => {
  return(
    
      <button onClick={handleClick}>{text}</button>
    
  )
}

const Statictics = ({text,good,bad,neutral,total,average,percentage}) => {

  if(total >0 ){
  return(
    <div>
       <h1>{text}</h1>
       
       <table>
        <tbody>
        <tr>
          <th>Good</th>
          <td>{good}</td>
        </tr>

        <tr>
          <th>Bad</th>
          <td>{bad}</td>
        </tr>

        <tr>
          <th>Neutral</th>
          <td>{neutral}</td>
        </tr>

        <tr>
          <th>Total</th>
          <td>{total}</td>
        </tr>

        <tr>
          <th>Average</th>
          <td>{average}</td>
        </tr>

        <tr>
          <th>Percentage</th>
          <td>{percentage}%</td>
        </tr>
        </tbody>
       </table>
    
    </div>
  )

  }
return(
  <div>
    <h3>No feedback given</h3>
  </div>
)
}

const App = () => {

  const[good, setGood] = useState(0);
  const[bad, setBad] = useState(0);
  const[neutral, setNeutral] = useState(0);
  



  
   const total = good + bad + neutral;
   const average = good / 3;
   const percentage = average * 100;
   const setFeedback = (feedback) => {
    setGood(feedback)
   }


  return(

    <div>
      <h1>Give Feedback</h1>
      <Button handleClick = {() => setGood(good+1)} text="Good" />
      <Button handleClick ={() => setBad(bad+1)} text="Bad" />
      <Button handleClick = {() => setNeutral(neutral+1)} text="Neutral"/>

      {/* <button onClick={() => setGood(good+1)} >Good</button>
      <button onClick={() => setBad(bad+1)}>Bad</button>
      <button onClick={() => setNeutral(neutral+1)}>Neutral</button> */}


     <Statictics 
           text="Statictics"
           good={good}
           bad={bad}
           neutral={neutral}
           total={total}
           average={average}
           percentage ={percentage}
       />
      
    </div>
  
  )
}






export default App;

