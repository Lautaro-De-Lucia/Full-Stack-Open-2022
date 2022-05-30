import React from 'react'

const Total = ({parts}) => {
    return (
      <div>
        <p>Number of exercises:  {parts.reduce((sum,part) => {return sum = sum + part.exercises},0)} </p>     
      </div>
    )
  }

export default Total