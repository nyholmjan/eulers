import React, { useState } from 'react'
import axios from 'axios'

import './ProblemCard.css'

type props = {
  index: number,
  problem: { description: string, solution: () => number, title: string },
  expanded: boolean,
  calculationCount: number
}

const ProblemCard: React.FC<props> = ({ index, problem, expanded, calculationCount }: props) => {
  const [isExpanded, setIsExpanded] = useState(expanded)
  const solveProblem = () => {
    const solution = problem.solution()
    axios.post('/answer', { answer: solution, problem: index })
    return solution
  }
  return (
    <>
      <h3
        className="clickable"
        onClick={event => setIsExpanded(!isExpanded)}>
        {`#${index}:  ${problem.title}`}
      </h3>
      {isExpanded && (
        <>
          <code style={{ whiteSpace: "pre-line" }}>{problem.description}</code>
          <p>
            <code>Answer: <b>{solveProblem()}</b></code>
            { calculationCount && <small>{` (calculated ${calculationCount} times)`}</small> }
          </p>
        </>
      )}
    </>
  );
}

export default ProblemCard;
