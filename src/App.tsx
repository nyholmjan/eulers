import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ProblemCard from './components/ProblemCard'
import problems from './problems'

import './App.css';

const App: React.FC = () => {
  const [calculationCounts, setCalculationCounts] = useState([])
  const tries = async () => {
    const result = await axios.get('/answers');
    return problems.map((problem, index) => {
      return result.data.filter((item: {problem: number}) => item.problem === index + 1).length;
    })
  }
  useEffect(() => {
    tries().then((a: any) => {
      setCalculationCounts(a)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {problems.map((problem, index) => (
          <ProblemCard
            key={problem.title}
            index={index + 1}
            problem={problem}
            expanded={index + 1 === problems.length}
            calculationCount={calculationCounts[index]}
          />
        )).reverse()}
      </header>
    </div>
  );
}

export default App;
